import Link from 'next/link';

const mockAccounts = [
  { id: '1', platform: 'Instagram', handle: '@brand', status: 'synced' },
  { id: '2', platform: 'TikTok', handle: '@creator', status: 'sync pending' }
];

export default function AccountsPage() {
  return (
    <section className="card">
      <div className="section-title">Connected accounts</div>
      <p className="section-muted">Quick overview of profiles piped into your dashboard.</p>
      <div className="grid">
        {mockAccounts.map((acc) => (
          <div key={acc.id} className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 700 }}>{acc.platform}</div>
            <div className="section-muted">{acc.handle}</div>
            <p className="badge" style={{ width: 'fit-content', marginTop: 10 }}>{acc.status}</p>
          </div>
        ))}
      </div>
      <Link href="/settings" className="button secondary" style={{ marginTop: 12 }}>
        Add account
      </Link>
    </section>
  );
}
