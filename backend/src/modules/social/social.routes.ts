import { Router } from 'express';
import { authenticate } from '../common/auth.middleware.js';
import { connectAccount, deleteAccount, listAccounts } from './social.controller.js';

const socialRouter = Router();

socialRouter.post('/connect/:platform', authenticate, connectAccount);
socialRouter.get('/accounts', authenticate, listAccounts);
socialRouter.delete('/accounts/:id', authenticate, deleteAccount);

export { socialRouter };
