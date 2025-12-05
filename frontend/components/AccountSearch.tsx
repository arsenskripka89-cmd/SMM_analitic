'use client';

import { FormEvent } from 'react';
import { useAccountStore } from '../state/useAccountStore';
import { Platform } from '../types';

const platformColors: Record<Platform, string> = {
  tiktok: 'bg-gradient-to-br from-slate-900 via-fuchsia-600 to-cyan-400',
  instagram: 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600',
  youtube: 'bg-red-500',
  twitter: 'bg-sky-500'
};

const platformNames: Record<Platform, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
  twitter: 'X'
};

export function AccountSearch() {
  const { selectedPlatform, setPlatform, searchUrl, setSearchUrl, fetchAccount, loading } = useAccountStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetchAccount(searchUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-500">
        <span>Пошук акаунтів</span>
        <span className="text-[11px] text-slate-400">URL + майданчик</span>
      </div>
      <div className="flex items-center gap-2">
        {(Object.keys(platformColors) as Platform[]).map((platform) => (
          <button
            key={platform}
            type="button"
            onClick={() => setPlatform(platform)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
              platformColors[platform]
            } ${selectedPlatform === platform ? 'ring-2 ring-offset-2 ring-offset-white ring-indigo-400' : ''}`}
            aria-label={platformNames[platform]}
          >
            {platformNames[platform][0]}
          </button>
        ))}
      </div>
      <label className="text-xs font-semibold text-slate-500">Встав URL акаунта</label>
      <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-2 focus-within:border-indigo-400 focus-within:bg-white">
        <input
          value={searchUrl}
          onChange={(e) => setSearchUrl(e.target.value)}
          className="flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none"
          placeholder="https://www.tiktok.com/@username"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-600"
          disabled={loading}
        >
          {loading ? 'Завантаження...' : 'Аналіз'}
        </button>
      </div>
      <p className="text-[11px] leading-5 text-slate-500">
        Ми робимо запит до <span className="font-semibold text-indigo-600">/analytics/posts?account_id=...</span> і
        <span className="font-semibold text-indigo-600"> /analytics/account/:id</span> одразу після кліку.
      </p>
    </form>
  );
}
