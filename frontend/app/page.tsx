import Link from 'next/link';

export default function Home() {
  return (
    <section>
      <h2>Welcome to SMM Analytics</h2>
      <p>Track performance across Instagram, TikTok, YouTube, and Twitter/X.</p>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/builder">Builder</Link>
        <Link href="/analytics">Analytics</Link>
        <Link href="/accounts">Accounts</Link>
        <Link href="/auth">Auth</Link>
      </nav>
    </section>
  );
}
