import { Router } from 'express';
import { login, me, register } from './auth.controller.js';
import { authenticate } from '../common/auth.middleware.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/me', authenticate, me);

export { authRouter };
