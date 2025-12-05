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
  if (idx === -1) return res.status(404).json({ message: 'Акаунт не знайдено' });
  accounts.splice(idx, 1);
  res.status(204).send();
};

export const getAuthUrl = (req: Request, res: Response) => {
  const platform = req.params.platform as Platform;
  const adapter = getPlatformAdapter(platform);
  const redirectUri = (req.query.redirectUri as string | undefined) ?? 'http://localhost:3000/auth/callback';

  if (!adapter) return res.status(400).json({ message: 'Платформа не підтримується' });

  res.json({ platform, authorizationUrl: adapter.buildAuthUrl(redirectUri) });
};

export const collectAccountInsights = (req: Request, res: Response) => {
  const platform = req.params.platform as Platform;
  const adapter = getPlatformAdapter(platform);
  const { accountId, handle, profileUrl } = req.body as {
    accountId?: string;
    handle?: string;
    profileUrl?: string;
  };

  if (!adapter) return res.status(400).json({ message: 'Платформа не підтримується' });

  const account = accountId ? accounts.find((a) => a.id === accountId) : undefined;
  const handleFromUrl = profileUrl ? parseHandleFromUrl(platform, profileUrl) : undefined;
  const effectiveHandle = handle ?? handleFromUrl ?? account?.handle;

  if (!effectiveHandle) {
    return res.status(400).json({
      message:
        'Не вистачає імені акаунта. Вкажіть handle вручну, ідентифікатор підключеного акаунта або дійсний URL профілю.'
    });
  }

  if (profileUrl && !handleFromUrl) {
    return res.status(400).json({
      message: 'Не вдалося визначити ім’я акаунта з URL. Перевірте, що посилання веде на публічний профіль цієї платформи.',
      details: {
        expectedFormats: urlPatterns[platform]
      }
    });
  }

  const token = account ? tokens.find((t) => t.socialAccountId === account.id) : undefined;
  const insights = adapter.fetchAccountMetrics({ handle: effectiveHandle, accessToken: token?.accessToken });

  res.json({ platform, account: account ?? { handle: effectiveHandle }, insights });
};

const urlPatterns: Record<Platform, string[]> = {
  instagram: ['https://www.instagram.com/<handle>'],
  tiktok: ['https://www.tiktok.com/@<handle>'],
  youtube: ['https://www.youtube.com/@<handle>', 'https://www.youtube.com/channel/<id>'],
  twitter: ['https://twitter.com/<handle>', 'https://x.com/<handle>']
};

const parseHandleFromUrl = (platform: Platform, profileUrl: string) => {
  const normalized = profileUrl.trim();

  switch (platform) {
    case 'instagram': {
      const match = normalized.match(/instagram\.com\/([^/?#]+)/i);
      return match?.[1];
    }
    case 'tiktok': {
      const match = normalized.match(/tiktok\.com\/@([^/?#]+)/i);
      return match?.[1];
    }
    case 'youtube': {
      const handleMatch = normalized.match(/youtube\.com\/@([^/?#]+)/i);
      if (handleMatch?.[1]) return handleMatch[1];
      const channelMatch = normalized.match(/youtube\.com\/channel\/([^/?#]+)/i);
      return channelMatch?.[1];
    }
    case 'twitter': {
      const match = normalized.match(/(?:twitter|x)\.com\/([^/?#]+)/i);
      return match?.[1];
    }
  }
};
