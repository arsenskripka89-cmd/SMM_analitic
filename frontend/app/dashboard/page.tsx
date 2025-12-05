'use client';

import { DashboardWidgetGrid } from '../../components/DashboardWidget';
import { useDashboardStore } from '../../state/dashboardStore';

export default function DashboardPage() {
  const widgets = useDashboardStore((s) => s.widgets);
  return (
    <section>
      <h2>My Dashboard</h2>
      <DashboardWidgetGrid widgets={widgets} />
    </section>
  );
}
