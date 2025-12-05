import Link from 'next/link';

const keyPoints = [
  'Триколонкова структура як у Popsters',
  'Zustand синхронізує фільтри, період і акаунти',
  'Recharts та React Grid Layout для метрик'
];

export default function Home() {
  return (
    <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-soft sm:grid-cols-[1.2fr_1fr]">
      <div className="space-y-4">
        <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">Новий макет</span>
        <h1 className="text-3xl font-bold text-slate-900">Інтерфейс аналітики з Popsters mood</h1>
        <p className="text-lg text-slate-600">
          Готовий UI з пошуком акаунтів, стрічкою постів і правою панеллю показників. Використовується TailwindCSS, Zustand, React Grid
          Layout та Recharts.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/analytics"
            className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-indigo-600"
          >
            Відкрити аналітику
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5"
          >
            Історія дашбордів
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {keyPoints.map((point) => (
            <div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
              {point}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/60 p-6 text-sm text-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-indigo-700">Легка навігація</span>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-indigo-600">Next.js 13</span>
        </div>
        <p>
          Сторінка аналітики імітує оригінальний скріншот Popsters: зліва сайдбар з пошуком, посередині стрічка, справа картки
          статистики з порівняннями по платформі.
        </p>
        <p className="text-xs text-slate-500">Адаптив оптимізований під 1440px+, але елементи акуратно стають у одну колонку на мобайлі.</p>
      </div>
    </section>
  );
}
