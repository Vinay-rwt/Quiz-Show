import { Router } from 'express';
import { z } from 'zod';
import { Difficulty } from '@prisma/client';
import { optionalAuth } from '../middleware/auth';
import { scoreAndPersistQuiz } from '../services/quizService';
import { BadRequestError } from '../utils/errors';

export const quizRouter = Router();

// isCorrect is intentionally absent: correctness is always recomputed server-side
// and must not be trusted from the client.
const answerSchema = z.object({
  questionId: z.string().min(1),
  selectedIndex: z.number().int().min(-1).max(3), // -1 = timed out
  timeTaken: z.number().int().min(0).max(60),
});

const submitSchema = z.object({
  // Validated as a strict enum so invalid slugs are rejected at the schema layer,
  // not silently passed through to a DB lookup.
  topicSlug: z.enum(['react', 'angular', 'typescript', 'system-design']),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  answers: z.array(answerSchema).min(1).max(15),
});

// POST /api/quiz/submit
// Works for both guests (no cookie) and authenticated users (cookie present).
// optionalAuth populates req.user if a valid JWT cookie is present.
quizRouter.post('/submit', optionalAuth, async (req, res, next) => {
  try {
    const body = submitSchema.safeParse(req.body);
    if (!body.success) {
      throw new BadRequestError(body.error.issues.map((i) => i.message).join(', '));
    }

    const result = await scoreAndPersistQuiz(
      {
        ...body.data,
        difficulty: body.data.difficulty as Difficulty,
      },
      req.user?.userId,
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
});
