import { Router } from 'express';
import { authenticate } from '../common/auth.middleware.js';
import { exportCsv, exportPdf } from './export.controller.js';

const exportRouter = Router();

exportRouter.post('/csv', authenticate, exportCsv);
exportRouter.post('/pdf', authenticate, exportPdf);

export { exportRouter };
