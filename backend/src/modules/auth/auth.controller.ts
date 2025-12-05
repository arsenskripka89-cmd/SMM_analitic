import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../../config/env.js';
import { User } from '../../db/models.js';

// Mock persistence layer
const users: User[] = [];

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = {
    id: crypto.randomUUID(),
    email,
    passwordHash,
    name,
    role: 'user',
    createdAt: new Date()
  };
  users.push(user);
  const token = jwt.sign({ sub: user.id }, env.jwtSecret, { expiresIn: '1d' });
  res.status(201).json({ token, user: { id: user.id, email, name } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: 'Невірні облікові дані' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Невірні облікові дані' });
  const token = jwt.sign({ sub: user.id }, env.jwtSecret, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
};

export const me = (req: Request, res: Response) => {
  const userId = (req as any).userId as string;
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });
  res.json({ id: user.id, email: user.email, name: user.name });
};
