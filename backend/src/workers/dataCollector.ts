import cron from 'node-cron';
import { AccountStatisticDaily, PostStatisticDaily } from '../db/models.js';

const accountStats: AccountStatisticDaily[] = [];
const postStats: PostStatisticDaily[] = [];

cron.schedule('0 * * * *', () => {
  const now = new Date();
  accountStats.push({
    id: crypto.randomUUID(),
    socialAccountId: 'demo-account',
    date: now,
    followers: 1000,
    following: 120,
    postsCount: 40,
    reach: 5000,
    impressions: 7000,
    engagementRate: 5.4
  });
  postStats.push({
    id: crypto.randomUUID(),
    postId: 'demo-post',
    date: now,
    likes: 100,
    comments: 10,
    shares: 5,
    views: 2000,
    reach: 1800,
    engagementRate: 6.2
  });
  // eslint-disable-next-line no-console
  console.log(`[worker] collected stats at ${now.toISOString()}`);
});
