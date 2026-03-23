import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getAnalyticsForUser } from '../services/analyticsService';

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
