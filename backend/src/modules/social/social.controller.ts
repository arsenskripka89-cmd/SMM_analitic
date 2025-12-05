import { Request, Response } from 'express';
import { Platform, SocialAccount, SocialToken } from '../../db/models.js';

const accounts: SocialAccount[] = [];
const tokens: SocialToken[] = [];

export const connectAccount = (req: Request, res: Response) => {
  const platform = req.params.platform as Platform;
  const { handle, externalId, accessToken, refreshToken } = req.body;
  const account: SocialAccount = {
    id: crypto.randomUUID(),
    userId: (req as any).userId,
    platform,
    handle,
    externalId,
    createdAt: new Date()
  };
  accounts.push(account);

  tokens.push({
    id: crypto.randomUUID(),
    socialAccountId: account.id,
    accessToken,
    refreshToken,
    expiresAt: undefined,
    createdAt: new Date()
  });

  res.status(201).json(account);
};

export const listAccounts = (req: Request, res: Response) => {
  const userId = (req as any).userId as string;
  res.json(accounts.filter((acc) => acc.userId === userId));
};

export const deleteAccount = (req: Request, res: Response) => {
  const id = req.params.id;
  const idx = accounts.findIndex((acc) => acc.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Account not found' });
  accounts.splice(idx, 1);
  res.status(204).send();
};
