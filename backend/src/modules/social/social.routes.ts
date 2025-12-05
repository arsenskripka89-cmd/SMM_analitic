import { Router } from 'express';
import { authenticate } from '../common/auth.middleware.js';
import {
  collectAccountInsights,
  connectAccount,
  deleteAccount,
  getAuthUrl,
  listAccounts
} from './social.controller.js';

const socialRouter = Router();

socialRouter.post('/connect/:platform', authenticate, connectAccount);
socialRouter.get('/connect/:platform/auth-url', authenticate, getAuthUrl);
socialRouter.post('/collect/:platform', authenticate, collectAccountInsights);
socialRouter.get('/accounts', authenticate, listAccounts);
socialRouter.delete('/accounts/:id', authenticate, deleteAccount);

export { socialRouter };
