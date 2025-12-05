import { Router } from 'express';
import { authenticate } from '../common/auth.middleware.js';
import {
  getAccountAnalytics,
  getHashtagAnalytics,
  getPostsAnalytics
} from './analytics.controller.js';

const analyticsRouter = Router();

analyticsRouter.get('/account/:id', authenticate, getAccountAnalytics);
analyticsRouter.get('/posts', authenticate, getPostsAnalytics);
analyticsRouter.get('/hashtags', authenticate, getHashtagAnalytics);

export { analyticsRouter };
