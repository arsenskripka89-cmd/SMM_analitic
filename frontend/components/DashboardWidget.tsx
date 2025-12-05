'use client';

import { Responsive, WidthProvider } from 'react-grid-layout';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { WidgetConfig } from '../state/dashboardStore';

const ResponsiveGridLayout = WidthProvider(Responsive);

const sampleData = [
  { date: '2024-05-01', followers: 1200, reach: 4500 },
  { date: '2024-05-02', followers: 1250, reach: 4600 },
  { date: '2024-05-03', followers: 1300, reach: 5000 }
];

interface Props {
  widgets: WidgetConfig[];
}

const widgetTitle = (type: string) => {
  if (type === 'line_chart') return 'Лінійний графік';
  return type;
};

export function DashboardWidgetGrid({ widgets }: Props) {
  const layouts = {
    lg: widgets.map((w) => ({ i: w.id, x: w.position.x, y: w.position.y, w: w.size.w, h: w.size.h }))
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      rowHeight={100}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      isDraggable
      isResizable
    >
      {widgets.map((w) => (
        <div
          key={w.id}
          data-grid={{ x: w.position.x, y: w.position.y, w: w.size.w, h: w.size.h }}
          style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: 10, border: '1px solid var(--border)' }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{widgetTitle(w.type)}</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sampleData} margin={{ left: 0, right: 0, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="var(--muted)" tickLine={false} axisLine={{ stroke: 'var(--border)' }} />
              <YAxis stroke="var(--muted)" tickLine={false} axisLine={{ stroke: 'var(--border)' }} />
              <Tooltip contentStyle={{ background: '#0f162e', border: '1px solid var(--border)' }} />
              <Line type="monotone" dataKey={w.metrics[0]} stroke="#7c8cff" strokeWidth={2} dot={false} />
              {w.metrics[1] && <Line type="monotone" dataKey={w.metrics[1]} stroke="#82ca9d" strokeWidth={2} dot={false} />}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
