import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Missing token' });
  const [, token] = header.split(' ');
  try {
    const payload = jwt.verify(token, env.jwtSecret) as { sub: string };
    (req as any).userId = payload.sub;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
