'use client';

import { Responsive, WidthProvider } from 'react-grid-layout';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
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
        <div key={w.id} data-grid={{ x: w.position.x, y: w.position.y, w: w.size.w, h: w.size.h }}>
          <h4>{w.type}</h4>
          <LineChart width={400} height={200} data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={w.metrics[0]} stroke="#8884d8" />
            {w.metrics[1] && <Line type="monotone" dataKey={w.metrics[1]} stroke="#82ca9d" />}
          </LineChart>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
