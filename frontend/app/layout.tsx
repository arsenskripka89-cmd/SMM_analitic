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
      <body className="app-body">
        <div className="app-shell">
          <header className="app-header">
            <div className="brand">
              <span className="brand-badge">SMM</span>
              <div>
                <div>SMM Analytics</div>
                <small style={{ color: 'var(--muted)', fontWeight: 600 }}>Єдина точка моніторингу</small>
              </div>
            </div>
            <nav className="nav">
              <Link href="/">Головна</Link>
              <Link href="/dashboard">Дашборд</Link>
              <Link href="/analytics">Аналітика</Link>
              <Link href="/accounts">Акаунти</Link>
              <Link href="/settings">Налаштування</Link>
              <Link href="/auth">Доступ</Link>
            </nav>
          </header>
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
