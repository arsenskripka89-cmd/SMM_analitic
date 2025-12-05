'use client';

import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onOpenStats?: (post: Post) => void;
}

const platformLabel: Record<Post['platform'], string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
  twitter: 'X'
};

export function PostCard({ post, onOpenStats }: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-0.5">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
            {post.platform[0].toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">{platformLabel[post.platform]}</div>
            <div className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString('uk-UA')}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button className="rounded-lg border border-slate-200 px-2 py-1 transition hover:border-indigo-400 hover:text-indigo-600">
            ←
          </button>
          <button className="rounded-lg border border-slate-200 px-2 py-1 transition hover:border-indigo-400 hover:text-indigo-600">
            →
          </button>
        </div>
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-[2fr_1fr]">
        <div className="relative overflow-hidden rounded-xl bg-slate-100">
          <img src={post.thumbnail} alt="Preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onOpenStats?.(post)}
            className="absolute left-2 top-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-indigo-600 shadow-sm transition hover:-translate-y-0.5"
          >
            Відкрити статистику
          </button>
        </div>
        <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Статистика</span>
            <a href={post.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-indigo-600">
              Відкрити пост
            </a>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            <Metric label="Лайки" value={post.likes} />
            <Metric label="Коментарі" value={post.comments} />
            <Metric label="Шери" value={post.shares} />
            <Metric label="Перегляди" value={post.views} />
          </div>
          <div className="grid grid-cols-3 gap-2 text-[11px] font-bold">
            <Badge label="ER post" value={`${post.erPost}%`} color="bg-indigo-50 text-indigo-600" />
            <Badge label="ER view" value={`${post.erView}%`} color="bg-emerald-50 text-emerald-600" />
            <Badge label="VR post" value={`${post.vrPost}%`} color="bg-orange-50 text-orange-600" />
          </div>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-base font-bold text-slate-800">{value.toLocaleString()}</div>
    </div>
  );
}

function Badge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`flex flex-col items-start gap-1 rounded-lg px-3 py-2 ${color}`}>
      <span className="text-[11px] font-semibold uppercase tracking-wide">{label}</span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}
