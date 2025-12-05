import { Request, Response } from 'express';
import crypto from 'node:crypto';
import { Platform, SocialAccount, SocialToken } from '../../db/models.js';
import { getPlatformAdapter } from './social.platformAdapters.js';

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

export const getAuthUrl = (req: Request, res: Response) => {
  const platform = req.params.platform as Platform;
  const adapter = getPlatformAdapter(platform);
  const redirectUri = (req.query.redirectUri as string | undefined) ?? 'http://localhost:3000/auth/callback';

  if (!adapter) return res.status(400).json({ message: 'Unsupported platform' });

  res.json({ platform, authorizationUrl: adapter.buildAuthUrl(redirectUri) });
};

export const collectAccountInsights = (req: Request, res: Response) => {
  const platform = req.params.platform as Platform;
  const adapter = getPlatformAdapter(platform);
  const { accountId, handle } = req.body as { accountId?: string; handle?: string };

  if (!adapter) return res.status(400).json({ message: 'Unsupported platform' });

  const account = accountId ? accounts.find((a) => a.id === accountId) : undefined;
  const effectiveHandle = handle ?? account?.handle;
  if (!effectiveHandle) {
    return res.status(400).json({ message: 'Missing account handle' });
  }

  const token = account ? tokens.find((t) => t.socialAccountId === account.id) : undefined;
  const insights = adapter.fetchAccountMetrics({ handle: effectiveHandle, accessToken: token?.accessToken });

  res.json({ platform, account: account ?? { handle: effectiveHandle }, insights });
};
