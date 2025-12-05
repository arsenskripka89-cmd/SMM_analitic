import { Router } from 'express';
import { authenticate } from '../common/auth.middleware.js';
import {
  addWidget,
  createDashboard,
  deleteDashboard,
  listDashboards,
  listWidgets,
  updateDashboard
} from './dashboard.controller.js';

const dashboardRouter = Router();

dashboardRouter.post('/', authenticate, createDashboard);
dashboardRouter.get('/', authenticate, listDashboards);
dashboardRouter.put('/:id', authenticate, updateDashboard);
dashboardRouter.delete('/:id', authenticate, deleteDashboard);
dashboardRouter.post('/:dashboardId/widgets', authenticate, addWidget);
dashboardRouter.get('/:dashboardId/widgets', authenticate, listWidgets);

export { dashboardRouter };
