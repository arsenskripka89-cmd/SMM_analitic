'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="card">
      <div className="section-title">Доступ</div>
      <p className="section-muted">Увійдіть, щоб відкрити дашборд безпосередньо в браузері.</p>
      <div className="form">
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="button">
          Увійти
        </button>
      </div>
      <p className="note">Демонстраційна форма — достатньо, щоб побачити сценарій.</p>
    </section>
  );
}
