import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SMM Analytics',
  description: 'Social media analytics suite'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
          <h1>SMM Analytics</h1>
        </header>
        <main style={{ padding: '16px' }}>{children}</main>
      </body>
    </html>
  );
}
