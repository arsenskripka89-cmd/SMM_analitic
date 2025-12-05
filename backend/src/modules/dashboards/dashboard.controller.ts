import { Request, Response } from 'express';
import { Dashboard, DashboardWidget } from '../../db/models.js';

const dashboards: Dashboard[] = [];
const widgets: DashboardWidget[] = [];

export const createDashboard = (req: Request, res: Response) => {
  const { name, layout } = req.body;
  const dashboard: Dashboard = {
    id: crypto.randomUUID(),
    userId: (req as any).userId,
    name,
    layout: layout || {},
    createdAt: new Date(),
    updatedAt: new Date()
  };
  dashboards.push(dashboard);
  res.status(201).json(dashboard);
};

export const listDashboards = (req: Request, res: Response) => {
  const userId = (req as any).userId as string;
  res.json(dashboards.filter((d) => d.userId === userId));
};

export const updateDashboard = (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body as Partial<Dashboard>;
  const dashboard = dashboards.find((d) => d.id === id);
  if (!dashboard) return res.status(404).json({ message: 'Dashboard not found' });
  Object.assign(dashboard, payload, { updatedAt: new Date() });
  res.json(dashboard);
};

export const deleteDashboard = (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = dashboards.findIndex((d) => d.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Dashboard not found' });
  dashboards.splice(idx, 1);
  res.status(204).send();
};

export const addWidget = (req: Request, res: Response) => {
  const { dashboardId } = req.params;
  const widget: DashboardWidget = {
    id: crypto.randomUUID(),
    dashboardId,
    type: req.body.type,
    config: req.body.config,
    position: req.body.position,
    size: req.body.size
  };
  widgets.push(widget);
  res.status(201).json(widget);
};

export const listWidgets = (req: Request, res: Response) => {
  const { dashboardId } = req.params;
  res.json(widgets.filter((w) => w.dashboardId === dashboardId));
};
