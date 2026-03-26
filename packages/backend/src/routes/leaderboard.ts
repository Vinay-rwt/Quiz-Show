import { Router } from 'express';
import { getLeaderboard } from '../services/leaderboardService';
import { BadRequestError } from '../utils/errors';

export const leaderboardRouter = Router();

// GET /api/leaderboard?topic=react&limit=10
// Public endpoint — no auth required.
leaderboardRouter.get('/', async (req, res, next) => {
  try {
    const { topic, limit } = req.query;

    // Use strict digit-only check before parsing — parseInt('10abc') would silently
    // return 10 and bypass the NaN guard.
    const rawLimit = typeof limit === 'string' ? limit : '10';
    if (!/^\d+$/.test(rawLimit)) {
      throw new BadRequestError('"limit" must be a number between 1 and 50');
    }
    const parsedLimit = parseInt(rawLimit, 10);
    if (parsedLimit < 1 || parsedLimit > 50) {
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
