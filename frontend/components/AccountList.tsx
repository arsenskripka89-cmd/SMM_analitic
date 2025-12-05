'use client';

import { useAccountStore } from '../state/useAccountStore';
import { Platform } from '../types';

const platformBg: Record<Platform, string> = {
  tiktok: 'bg-slate-900 text-white',
  instagram: 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white',
  youtube: 'bg-red-500 text-white',
  twitter: 'bg-sky-500 text-white'
};

export function AccountList() {
  const { accounts, recent } = useAccountStore();
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft">
      <div>
        <div className="text-xs font-semibold uppercase text-slate-500">Збережені акаунти</div>
        <div className="mt-3 space-y-2">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${platformBg[account.platform]}`}>
                {account.name[1] ?? account.name[0]}
              </div>
              <div className="flex-1">
                <div className="text-slate-800">{account.name}</div>
                <div className="text-xs text-slate-500">{account.platform}</div>
              </div>
              <span className="rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-600">{account.followers.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold uppercase text-slate-500">Недавно завантажено</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {recent.map((account) => (
            <span
              key={`recent-${account.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              <span className={`h-6 w-6 rounded-full ${platformBg[account.platform]}`}></span>
              {account.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
