import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../db';
import { config } from '../config';
import { BadRequestError, ConflictError, UnauthorizedError } from '../utils/errors';
import type { Response } from 'express';

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function issueToken(res: Response, userId: string, email: string, username: string): void {
  const token = jwt.sign({ userId, email, username }, config.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

authRouter.post('/register', async (req, res, next) => {
  try {
    const body = registerSchema.safeParse(req.body);
    if (!body.success) {
      throw new BadRequestError(body.error.issues.map((i) => i.message).join(', '));
    }

    const { email, username, password } = body.data;

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      // Generic message — don't reveal which field matched to prevent
      // email/username enumeration attacks.
      throw new ConflictError('An account already exists with this email or username.');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, username, passwordHash },
    });

    issueToken(res, user.id, user.email, user.username);
    res.status(201).json({
      user: { id: user.id, email: user.email, username: user.username, createdAt: user.createdAt },
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const body = loginSchema.safeParse(req.body);
    if (!body.success) {
      throw new BadRequestError('Invalid email or password');
    }

    const user = await prisma.user.findUnique({ where: { email: body.data.email } });
    if (!user) throw new UnauthorizedError('Invalid email or password');

    const valid = await bcrypt.compare(body.data.password, user.passwordHash);
    if (!valid) throw new UnauthorizedError('Invalid email or password');

    issueToken(res, user.id, user.email, user.username);
    res.json({
      user: { id: user.id, email: user.email, username: user.username, createdAt: user.createdAt },
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

authRouter.get('/me', async (req, res) => {
  const token = req.cookies?.token as string | undefined;
  if (!token) {
    res.json({ user: null });
    return;
  }
  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as {
      userId: string;
      email: string;
      username: string;
    };
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      res.clearCookie('token');
      res.json({ user: null });
      return;
    }
    res.json({
      user: { id: user.id, email: user.email, username: user.username, createdAt: user.createdAt },
    });
  } catch {
    res.json({ user: null });
  }
});
