import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes.js';
import { socialRouter } from '../modules/social/social.routes.js';
import { analyticsRouter } from '../modules/analytics/analytics.routes.js';
import { dashboardRouter } from '../modules/dashboards/dashboard.routes.js';
import { exportRouter } from '../modules/export/export.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/social', socialRouter);
router.use('/analytics', analyticsRouter);
router.use('/dashboards', dashboardRouter);
router.use('/export', exportRouter);

export { router };
