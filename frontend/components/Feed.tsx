'use client';

import { useMemo, useState } from 'react';
import { SortKey, useFeedStore } from '../state/useFeedStore';
import { PostCard } from './PostCard';
import { DateRangePicker } from './DateRangePicker';

const sortLabels: Record<SortKey, string> = {
  likes: 'Лайки',
  shares: 'Акції',
  comments: 'Коментарі',
  views: 'Перегляди',
  erPost: 'ER post',
  erView: 'ER view',
  vrPost: 'VR',
  date: 'Дата'
};

const contentTypes = [
  { id: 'video', label: 'Відео' },
  { id: 'photo', label: 'Фото' },
  { id: 'carousel', label: 'Карусель' }
];

export function Feed() {
  const { filtered, sortBy, setSort, setPlatformFilter, platformFilter, toggleContentType, contentTypes: activeTypes } =
    useFeedStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const visiblePosts = useMemo(
    () => filtered.filter((p) => p.url.toLowerCase().includes(searchTerm.toLowerCase())),
    [filtered, searchTerm]
  );

  const selectedPost = visiblePosts.find((p) => p.id === selectedPostId);

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
            <span>Фільтр по сторінкам</span>
            <select
              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value as any)}
            >
              <option value="all">Усі</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="twitter">X</option>
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
            <span>Пошук повідомлень</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 outline-none"
              placeholder="ключові слова..."
            />
          </div>
          <div className="flex items-center gap-2">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => toggleContentType(type.id)}
                className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
                  activeTypes.includes(type.id)
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-600'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
            <span>Сортування</span>
            <select
              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
              value={sortBy}
              onChange={(e) => setSort(e.target.value as any)}
            >
              {Object.entries(sortLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <DateRangePicker />
        </div>
      </div>

      <div className="space-y-4">
        {visiblePosts.map((post) => (
          <PostCard key={post.id} post={post} onOpenStats={() => setSelectedPostId(post.id)} />
        ))}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm">
          <div className="w-[640px] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold uppercase text-slate-500">Повна статистика поста</div>
                <div className="text-lg font-bold text-slate-900">{selectedPost.url}</div>
              </div>
              <button
                onClick={() => setSelectedPostId(null)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                Закрити
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm font-semibold text-slate-700">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">Лайки: {selectedPost.likes.toLocaleString()}</div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">Коментарі: {selectedPost.comments.toLocaleString()}</div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">Перегляди: {selectedPost.views.toLocaleString()}</div>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Попередній перегляд статистики дозволяє швидко співставити ER та VR по кожному посту і порівняти з середніми значеннями
              по платформі, як у Popsters. Використовуйте фільтри та дату, щоб оновити дашборд.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
