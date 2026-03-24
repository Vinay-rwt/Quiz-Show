import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { authRouter } from './routes/auth';
import { topicsRouter } from './routes/topics';
import { questionsRouter } from './routes/questions';
import { quizRouter } from './routes/quiz';
import { analyticsRouter } from './routes/analytics';
import { leaderboardRouter } from './routes/leaderboard';
import { AppError } from './utils/errors';
import { config } from './config';

// ── Rate limiters ────────────────────────────────────────────────────────────

// Auth endpoints: strict — prevents brute-force on login and spam registration
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,                   // 20 attempts per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in 15 minutes.' },
});

// Quiz submit: moderate — one quiz takes ~10 min; 10/15-min window is generous
const quizLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many quiz submissions. Please slow down.' },
});

// General API: loose ceiling to prevent scraping/DoS
const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please slow down.' },
});

// ── App factory ──────────────────────────────────────────────────────────────

export function createApp(): express.Application {
  const app = express();

  // Helmet sets secure HTTP headers: X-Frame-Options, X-Content-Type-Options,
  // Strict-Transport-Security, Content-Security-Policy, etc.
  app.use(helmet());

  app.use(
    cors({
      origin: config.FRONTEND_URL,
      credentials: true,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    }),
  );

  app.use(express.json({ limit: '16kb' })); // cap body size to prevent payload attacks
  app.use(cookieParser());

  // Apply general limiter to all routes, then tighten on specific ones
  app.use(generalLimiter);

  // Health check (exempt from tight limits — used by infra probes)
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // API routes
  app.use('/api/auth', authLimiter, authRouter);
  app.use('/api/topics', topicsRouter);
  app.use('/api/questions', questionsRouter);
  app.use('/api/quiz', quizLimiter, quizRouter);
  app.use('/api/analytics', analyticsRouter);
  app.use('/api/leaderboard', leaderboardRouter);

  // Global error handler — never leak stack traces to clients
  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      // Log full error server-side, but only return a generic message to the client
      console.error('Unhandled error:', err);
      res.status(500).json({ error: 'Internal server error' });
    },
  );

  return app;
}
