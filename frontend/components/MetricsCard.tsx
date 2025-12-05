'use client';

interface MetricsCardProps {
  title: string;
  value: string;
  delta?: string;
  accent?: string;
  footer?: string;
}

export function MetricsCard({ title, value, delta, accent = 'bg-indigo-50 text-indigo-600', footer }: MetricsCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span>{title}</span>
        {delta && <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${accent}`}>{delta}</span>}
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      {footer && <div className="text-xs font-semibold text-slate-500">{footer}</div>}
    </div>
  );
}
