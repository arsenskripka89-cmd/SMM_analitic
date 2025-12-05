import { Request, Response } from 'express';
import { AccountStatisticDaily, Post, PostStatisticDaily } from '../../db/models.js';

const postStats: PostStatisticDaily[] = [];
const accountStats: AccountStatisticDaily[] = [];
const posts: Post[] = [];

export const getAccountAnalytics = (req: Request, res: Response) => {
  const { id } = req.params;
  const range = req.query.range as string | undefined;
  const data = accountStats.filter((stat) => stat.socialAccountId === id);
  res.json({ range, data });
};

export const getPostsAnalytics = (req: Request, res: Response) => {
  const { tag, type } = req.query;
  const postIds = posts
    .filter((p) => !type || p.type === type)
    .filter((p) => !tag || p.title.includes(tag as string))
    .map((p) => p.id);
  res.json(postStats.filter((s) => postIds.includes(s.postId)));
};

export const getHashtagAnalytics = (_req: Request, res: Response) => {
  res.json({ top: ['#growth', '#viral'], related: ['#instagram', '#tiktok'] });
};
