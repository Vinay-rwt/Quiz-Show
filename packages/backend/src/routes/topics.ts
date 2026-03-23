import { Router } from 'express';
import { prisma } from '../db';

export const topicsRouter = Router();

topicsRouter.get('/', async (_req, res, next) => {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: { name: 'asc' },
    });
    res.json({ topics });
  } catch (err) {
    next(err);
  }
});
