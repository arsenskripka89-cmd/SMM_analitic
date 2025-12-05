'use client';

import { Sidebar } from '../../components/Sidebar';
import { Feed } from '../../components/Feed';
import { AccountStatsPanel } from '../../components/AccountStatsPanel';

export default function AnalyticsPage() {
  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1.4fr_380px]">
      <Sidebar />
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase text-slate-500">Стрічка постів</div>
              <div className="text-lg font-bold text-slate-900">Popsters-style перегляд</div>
              <p className="text-sm text-slate-500">Сортування, фільтри контенту і дат оновлюють запити автоматично.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">ER View</span>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">VR</span>
            </div>
          </div>
        </div>
        <Feed />
      </div>
      <AccountStatsPanel />
    </section>
  );
}
