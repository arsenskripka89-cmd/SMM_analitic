'use client';

import { useState } from 'react';
import Link from 'next/link';

type Account = {
  id: string;
  platform: string;
  handle: string;
  status: string;
};

const initialAccounts: Account[] = [
  { id: '1', platform: 'Instagram', handle: '@brand', status: 'синхронізовано' },
  { id: '2', platform: 'TikTok', handle: '@creator', status: 'очікує синхронізації' }
];

const platformFromHost = (host: string) => {
  if (host.includes('instagram')) return 'Instagram';
  if (host.includes('tiktok')) return 'TikTok';
  if (host.includes('youtube') || host.includes('youtu.be')) return 'YouTube';
  if (host.includes('twitter') || host.includes('x.com')) return 'X';
  return 'Інша мережа';
};

const normalizeHandle = (handle: string) => {
  const cleaned = handle.replace(/\/+$/g, '').replace(/^@/, '');
  return `@${cleaned}`;
};

const parseAccountFromUrl = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const url = trimmed.startsWith('http') ? new URL(trimmed) : new URL(`https://${trimmed}`);
    const path = url.pathname.replace(/^\/+|\/+$/g, '');
    const [handlePart] = path.split('/');
    if (!handlePart) return null;

    return {
      platform: platformFromHost(url.hostname),
      handle: normalizeHandle(handlePart)
    } satisfies Omit<Account, 'id' | 'status'>;
  } catch {
    if (trimmed.startsWith('@')) {
      return {
        platform: 'Інша мережа',
        handle: normalizeHandle(trimmed)
      } satisfies Omit<Account, 'id' | 'status'>;
    }
    return null;
  }
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [profileUrl, setProfileUrl] = useState('');
  const [error, setError] = useState('');

  const addAccount = () => {
    const parsed = parseAccountFromUrl(profileUrl);
    if (!parsed) {
      setError('Не вдалося розпізнати посилання. Спробуйте ще раз.');
      return;
    }

    const newAccount: Account = {
      id: crypto.randomUUID(),
      status: 'очікує синхронізації',
      ...parsed
    };
    setAccounts((prev) => [...prev, newAccount]);
    setProfileUrl('');
    setError('');
  };

  return (
    <section className="card">
      <div className="section-title">Підключені акаунти</div>
      <p className="section-muted">Швидкий огляд профілів, які підтягуються до вашого дашборда.</p>

      <div className="grid">
        {accounts.map((acc) => (
          <div key={acc.id} className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 700 }}>{acc.platform}</div>
            <div className="section-muted">{acc.handle}</div>
            <p className="badge" style={{ width: 'fit-content', marginTop: 10 }}>{acc.status}</p>
          </div>
        ))}
      </div>

      <div className="form">
        <label style={{ fontWeight: 700 }}>Додайте акаунт за URL</label>
        <input
          className="input"
          placeholder="https://www.instagram.com/yourprofile"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
        />
        {error && <p className="note" style={{ color: '#f1c2c6' }}>{error}</p>}
        <button type="button" className="button" onClick={addAccount}>
          Підключити за посиланням
        </button>
        <p className="note">
          Підтримуються посилання Instagram, TikTok, YouTube та X. Додані профілі отримають статус «очікує синхронізації».
        </p>
      </div>

      <Link href="/settings" className="button secondary" style={{ marginTop: 12 }}>
        Перейти до налаштувань
      </Link>
    </section>
  );
}
