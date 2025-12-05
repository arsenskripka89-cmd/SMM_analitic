import Link from 'next/link';

const mockAccounts = [
  { id: '1', platform: 'instagram', handle: '@brand' },
  { id: '2', platform: 'tiktok', handle: '@creator' }
];

export default function AccountsPage() {
  return (
    <section>
      <h2>Connected Accounts</h2>
      <ul>
        {mockAccounts.map((acc) => (
          <li key={acc.id}>
            {acc.platform} — {acc.handle}
          </li>
        ))}
      </ul>
      <Link href="/settings">Add more</Link>
    </section>
  );
}
