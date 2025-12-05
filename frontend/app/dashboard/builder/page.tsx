'use client';

import { useState } from 'react';
import { DashboardWidgetGrid } from '../../../components/DashboardWidget';
import { useDashboardStore } from '../../../state/dashboardStore';

export default function DashboardBuilderPage() {
  const { widgets, addWidget } = useDashboardStore();
  const [type, setType] = useState('line_chart');

  const handleAdd = () => {
    addWidget({
      type,
      metrics: ['followers'],
      accountId: 'instagram_123',
      dateRange: 'last_7_days',
      position: { x: 0, y: widgets.length },
      size: { w: 4, h: 3 }
    });
  };

  return (
    <section>
      <h2>Dashboard Builder</h2>
      <div style={{ marginBottom: '12px' }}>
        <label>
          Widget type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="line_chart">Line chart</option>
            <option value="bar_chart">Bar chart</option>
            <option value="table">Table</option>
          </select>
        </label>
        <button type="button" onClick={handleAdd} style={{ marginLeft: 8 }}>
          Add widget
        </button>
      </div>
      <DashboardWidgetGrid widgets={widgets} />
    </section>
  );
}
