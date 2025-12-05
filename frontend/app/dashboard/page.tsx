'use client';

import { DashboardWidgetGrid } from '../../components/DashboardWidget';
import { useDashboardStore } from '../../state/dashboardStore';

export default function DashboardPage() {
  const widgets = useDashboardStore((s) => s.widgets);
  return (
    <section className="card">
      <div className="section-title">Дашборд</div>
      <p className="section-muted">Вільно рухайте картки, щоб сконцентруватися на ключових сигналах.</p>
      <div style={{ border: '1px dashed var(--border)', borderRadius: 12, padding: 12, background: '#0b1021' }}>
        <DashboardWidgetGrid widgets={widgets} />
      </div>
    </section>
  );
}
