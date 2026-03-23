import { Router } from 'express';
import { Difficulty } from '@prisma/client';
import { getRandomQuestions } from '../services/questionService';
import { BadRequestError } from '../utils/errors';

export const questionsRouter = Router();

// GET /api/questions?topic=react&difficulty=EASY&count=10
questionsRouter.get('/', async (req, res, next) => {
  try {
    const { topic, difficulty, count } = req.query;

    if (!topic || typeof topic !== 'string') {
      throw new BadRequestError('Query param "topic" is required');
    }
    if (!difficulty || typeof difficulty !== 'string') {
      throw new BadRequestError('Query param "difficulty" is required (EASY | MEDIUM | HARD)');
    }
    if (!Object.values(Difficulty).includes(difficulty as Difficulty)) {
      throw new BadRequestError(`"difficulty" must be one of: ${Object.values(Difficulty).join(', ')}`);
    }

    const parsedCount = count ? parseInt(count as string, 10) : 10;
    if (isNaN(parsedCount)) {
      throw new BadRequestError('"count" must be a number');
    }

    const questions = await getRandomQuestions(topic, difficulty as Difficulty, parsedCount);
    res.json({ questions });
  } catch (err) {
    next(err);
  }
});
