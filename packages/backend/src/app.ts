import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { topicsRouter } from './routes/topics';
import { questionsRouter } from './routes/questions';
import { quizRouter } from './routes/quiz';
import { AppError } from './utils/errors';
import { config } from './config';

export function createApp(): express.Application {
  const app = express();

  app.use(
    cors({
      origin: config.FRONTEND_URL,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(cookieParser());

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // API routes
  app.use('/api/auth', authRouter);
  app.use('/api/topics', topicsRouter);
  app.use('/api/questions', questionsRouter);
  app.use('/api/quiz', quizRouter);

  // Global error handler
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
      console.error('Unhandled error:', err);
      res.status(500).json({ error: 'Internal server error' });
    },
  );

  return app;
}
