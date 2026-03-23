import { Router } from 'express';
import { getLeaderboard } from '../services/leaderboardService';
import { BadRequestError } from '../utils/errors';

export const leaderboardRouter = Router();

// GET /api/leaderboard?topic=react&limit=10
// Public endpoint — no auth required.
leaderboardRouter.get('/', async (req, res, next) => {
  try {
    const { topic, limit } = req.query;

    const parsedLimit = limit ? parseInt(limit as string, 10) : 10;
    if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 50) {
      throw new BadRequestError('"limit" must be a number between 1 and 50');
    }

    const entries = await getLeaderboard(
      topic && typeof topic === 'string' ? topic : undefined,
      parsedLimit,
    );

    res.json({ entries });
  } catch (err) {
    next(err);
  }
});
