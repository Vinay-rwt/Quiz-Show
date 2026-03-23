import { Router } from 'express';
import { z } from 'zod';
import { Difficulty } from '@prisma/client';
import { optionalAuth } from '../middleware/auth';
import { scoreAndPersistQuiz } from '../services/quizService';
import { BadRequestError } from '../utils/errors';
import type { TopicSlug } from '@quizapp/shared';

export const quizRouter = Router();

const answerSchema = z.object({
  questionId: z.string().min(1),
  selectedIndex: z.number().int().min(-1).max(3), // -1 = timed out
  timeTaken: z.number().int().min(0).max(60),
  isCorrect: z.boolean(),
});

const submitSchema = z.object({
  topicSlug: z.string().min(1),
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
        topicSlug: body.data.topicSlug as TopicSlug,
        difficulty: body.data.difficulty as Difficulty,
      },
      req.user?.userId,
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
});
