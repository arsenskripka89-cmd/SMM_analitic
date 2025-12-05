'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { useAccountStore } from '../state/useAccountStore';
import { useFeedStore } from '../state/useFeedStore';
import { MetricsCard } from './MetricsCard';

const ResponsiveGridLayout = WidthProvider(Responsive);

export function AccountStatsPanel() {
  const { active } = useAccountStore();
  const { filtered, dateRange } = useFeedStore();
  const [openModal, setOpenModal] = useState(false);

  const engagementData = useMemo(
    () =>
      filtered.map((post) => ({
        name: new Date(post.date).toLocaleDateString('uk-UA', { day: '2-digit', month: 'short' }),
        likes: post.likes,
        comments: post.comments,
        views: post.views
      })),
    [filtered]
  );

  if (!active) return null;

  const layout = {
    lg: [
      { i: 'followers', x: 0, y: 0, w: 2, h: 2 },
      { i: 'posts', x: 2, y: 0, w: 2, h: 2 },
      { i: 'likes', x: 4, y: 0, w: 2, h: 2 },
      { i: 'comments', x: 0, y: 2, w: 2, h: 2 },
      { i: 'views', x: 2, y: 2, w: 2, h: 2 },
      { i: 'vr', x: 4, y: 2, w: 2, h: 2 },
      { i: 'chart', x: 0, y: 4, w: 6, h: 3 }
    ]
  };

  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase text-slate-500">Акаунт</div>
            <div className="text-lg font-bold text-slate-900">{active.name}</div>
            <div className="text-xs font-semibold text-slate-500">Період: {dateRange.from} — {dateRange.to}</div>
          </div>
          <button
            className="rounded-full bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-indigo-600"
            onClick={() => setOpenModal(true)}
          >
            Відкрити повну соціальну статистику
          </button>
        </div>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={layout}
        rowHeight={70}
        isResizable={false}
        isDraggable={false}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 4, xs: 2, xxs: 2 }}
      >
        <div key="followers" className="!h-full">
          <MetricsCard title="Підписники" value={active.followers.toLocaleString()} delta="+2.3%" footer="+12.3k vs минулий місяць" />
        </div>
        <div key="posts" className="!h-full">
          <MetricsCard title="Пости" value={active.posts.toString()} delta="-4%" accent="bg-amber-50 text-amber-600" footer="Тренд нижче середнього" />
        </div>
        <div key="likes" className="!h-full">
          <MetricsCard title="Середні лайки" value={active.avgLikes.toLocaleString()} delta="+8%" />
        </div>
        <div key="comments" className="!h-full">
          <MetricsCard title="Середні коментарі" value={active.avgComments.toLocaleString()} delta="+3%" />
        </div>
        <div key="views" className="!h-full">
          <MetricsCard title="Середні перегляди" value={active.avgViews.toLocaleString()} delta="+5%" />
        </div>
        <div key="vr" className="!h-full">
          <MetricsCard title="VR %" value={`${active.vr}%`} delta="+1.1%" accent="bg-emerald-50 text-emerald-600" footer="Вище платформи" />
        </div>
        <div key="chart" className="!h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase text-slate-500">Енгейджмент</div>
              <div className="text-sm font-semibold text-slate-800">За останні пости</div>
            </div>
            <div className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-600">Порівняння з платформою</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData} margin={{ top: 10, left: 0, right: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#e5e7eb' }} />
                <Area type="monotone" dataKey="likes" stroke="#6c5ce7" fillOpacity={1} fill="url(#colorLikes)" strokeWidth={2} />
                <Area type="monotone" dataKey="views" stroke="#22c55e" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ResponsiveGridLayout>

      {openModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm">
          <div className="w-[520px] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold uppercase text-slate-500">Повна соціальна статистика</div>
                <div className="text-lg font-bold text-slate-900">{active.name}</div>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                Закрити
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
              <MetricsCard title="ER Post %" value={`${active.erPost}%`} accent="bg-indigo-50 text-indigo-600" />
              <MetricsCard title="ER Views %" value={`${active.erViews}%`} accent="bg-emerald-50 text-emerald-600" />
              <MetricsCard title="VR %" value={`${active.vr}%`} accent="bg-orange-50 text-orange-600" />
              <MetricsCard title="Пости" value={active.posts.toString()} accent="bg-slate-100 text-slate-700" />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Ми порівняли ваші показники з середнім по платформі: ERpost 12% → 8.4% (середнє), ERviews 9.4% → 7.1% (середнє), VR
              7.4% → 5.9% (середнє). Рухайте картки, щоб зосередитись на важливих метриках.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
