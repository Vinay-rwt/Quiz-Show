import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getAnalyticsForUser, getRecentAttempts } from '../services/analyticsService';

export const analyticsRouter = Router();

// GET /api/analytics/me
// Requires authentication — guests have no persisted history.
analyticsRouter.get('/me', requireAuth, async (req, res, next) => {
  try {
    const summary = await getAnalyticsForUser(req.user!.userId);
    res.json(summary);
  } catch (err) {
    next(err);
  }
});

// GET /api/analytics/history?limit=10
// Returns recent quiz attempts for the authenticated user.
analyticsRouter.get('/history', requireAuth, async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query['limit']) || 10, 50);
    const attempts = await getRecentAttempts(req.user!.userId, limit);
    res.json({ attempts });
  } catch (err) {
    next(err);
  }
});
