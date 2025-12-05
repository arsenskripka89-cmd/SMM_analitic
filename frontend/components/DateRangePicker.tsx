'use client';

import { useState } from 'react';
import { useFeedStore } from '../state/useFeedStore';

export function DateRangePicker() {
  const { dateRange, setDateRange } = useFeedStore();
  const [localFrom, setLocalFrom] = useState(dateRange.from);
  const [localTo, setLocalTo] = useState(dateRange.to);

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>Період</span>
        <button
          type="button"
          onClick={() => setDateRange({ from: localFrom, to: localTo })}
          className="rounded-lg bg-indigo-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm transition hover:bg-indigo-600"
        >
          Оновити
        </button>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <input
          type="date"
          className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 outline-none"
          value={localFrom}
          onChange={(e) => setLocalFrom(e.target.value)}
        />
        <span>—</span>
        <input
          type="date"
          className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 outline-none"
          value={localTo}
          onChange={(e) => setLocalTo(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 text-[11px] font-semibold text-indigo-600">
        <button onClick={() => setDateRange({ from: '2024-01-01', to: '2024-01-31' })} className="rounded-lg bg-indigo-50 px-2 py-1">Січень</button>
        <button onClick={() => setDateRange({ from: '2024-02-01', to: '2024-02-29' })} className="rounded-lg bg-indigo-50 px-2 py-1">Лютий</button>
      </div>
    </div>
  );
}
