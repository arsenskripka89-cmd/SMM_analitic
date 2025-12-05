import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SMM Analytics',
  description: 'Social media analytics suite'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="app-body">
        <div className="app-shell">
          <header className="app-header">
            <div className="brand">
              <span className="brand-badge">SMM</span>
              <div>
                <div>SMM Analytics</div>
                <small style={{ color: 'var(--muted)', fontWeight: 600 }}>Unified monitoring</small>
              </div>
            </div>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/analytics">Analytics</Link>
              <Link href="/accounts">Accounts</Link>
              <Link href="/settings">Settings</Link>
              <Link href="/auth">Auth</Link>
            </nav>
          </header>
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
