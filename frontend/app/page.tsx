import Link from 'next/link';

const keyPoints = [
  'Live reach and follower deltas',
  'Drag-and-drop dashboard cards',
  'Cross-network breakdowns'
];

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-card">
        <p className="badge" style={{ width: 'fit-content', marginBottom: 12 }}>Minimal workspace</p>
        <h2 className="hero-title">Track every channel in one clean view.</h2>
        <p className="hero-subtitle">
          A focused surface for monitoring Instagram, TikTok, YouTube, and X without distractions.
        </p>
        <div className="actions">
          <Link href="/dashboard" className="button">
            Open dashboard
          </Link>
          <Link href="/analytics" className="button secondary">
            View analytics
          </Link>
        </div>
      </div>
      <div className="card">
        <div className="section-title">Everything you need</div>
        <div className="section-muted">Three quick highlights of the workspace.</div>
        <div className="grid">
          {keyPoints.map((point) => (
            <div key={point} className="card" style={{ padding: 14 }}>
              <div style={{ fontWeight: 700 }}>{point}</div>
              <div className="section-muted" style={{ marginTop: 6 }}>
                Lightweight cards keep attention on the data you need right now.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
