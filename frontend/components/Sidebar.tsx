'use client';

import { AccountList } from './AccountList';
import { AccountSearch } from './AccountSearch';

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-4">
      <AccountSearch />
      <AccountList />
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs font-semibold text-slate-600 shadow-soft">
        <div className="flex items-center justify-between">
          <span>Джерело даних</span>
          <span className="rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-600">API</span>
        </div>
        <p className="mt-2 text-[11px] leading-5 text-slate-500">
          При виборі акаунта оновлюються запити до бекенду, фільтри та дата діапазон синхронізуються зі стрічкою постів і блоком
          статистики праворуч. Адаптив для 1440px+ зберігає три колонки.
        </p>
      </div>
    </aside>
  );
}
