'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="card">
      <div className="section-title">Access</div>
      <p className="section-muted">Sign in to open the dashboard directly in your browser.</p>
      <div className="form">
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="button">
          Submit
        </button>
      </div>
      <p className="note">Demo form only — just enough to preview the flow.</p>
    </section>
  );
}
