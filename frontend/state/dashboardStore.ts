'use client';

import { create } from 'zustand';

export type WidgetConfig = {
  id: string;
  type: string;
  metrics: string[];
  accountId: string;
  dateRange: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
};

interface DashboardState {
  widgets: WidgetConfig[];
  addWidget: (widget: Omit<WidgetConfig, 'id'>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  widgets: [
    {
      id: 'demo',
      type: 'line_chart',
      metrics: ['followers', 'reach'],
      accountId: 'instagram_123',
      dateRange: 'last_30_days',
      position: { x: 0, y: 0 },
      size: { w: 4, h: 3 }
    }
  ],
  addWidget: (widget) =>
    set((state) => ({
      widgets: [...state.widgets, { ...widget, id: crypto.randomUUID() }]
    }))
}));
