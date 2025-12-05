import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SMM Analytics',
  description: 'Панель аналітики соціальних мереж'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-surface text-slate-900">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-2 text-sm font-bold text-white shadow-soft">
                SMM
              </div>
              <div>
                <div className="text-base font-semibold text-slate-800">SMM Analytics</div>
                <div className="text-xs font-medium text-slate-500">єдина точка моніторингу</div>
              </div>
            </Link>
            <nav className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <Link className="rounded-lg px-3 py-2 transition hover:bg-slate-100" href="/">Головна</Link>
              <Link className="rounded-lg px-3 py-2 transition hover:bg-slate-100" href="/analytics">Аналітика</Link>
              <Link className="rounded-lg px-3 py-2 transition hover:bg-slate-100" href="/dashboard">Дашборд</Link>
              <Link className="rounded-lg px-3 py-2 transition hover:bg-slate-100" href="/accounts">Акаунти</Link>
              <Link className="rounded-lg px-3 py-2 transition hover:bg-slate-100" href="/settings">Налаштування</Link>
              <Link className="rounded-lg px-3 py-2 transition hover:bg-slate-100" href="/auth">Доступ</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
