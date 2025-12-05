import Link from 'next/link';

const keyPoints = [
  'Оновлення охоплення та підписників у реальному часі',
  'Картки дашборда можна перетягувати',
  'Зрізи по всіх майданчиках'
];

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-card">
        <p className="badge" style={{ width: 'fit-content', marginBottom: 12 }}>Мінімалістичний простір</p>
        <h2 className="hero-title">Відстежуйте кожен канал в єдиному зручному екрані.</h2>
        <p className="hero-subtitle">
          Сфокусована площина для моніторингу Instagram, TikTok, YouTube та X без зайвих відволікань.
        </p>
        <div className="actions">
          <Link href="/dashboard" className="button">
            Відкрити дашборд
          </Link>
          <Link href="/analytics" className="button secondary">
            Переглянути аналітику
          </Link>
        </div>
      </div>
      <div className="card">
        <div className="section-title">Усе необхідне</div>
        <div className="section-muted">Три ключові особливості робочої поверхні.</div>
        <div className="grid">
          {keyPoints.map((point) => (
            <div key={point} className="card" style={{ padding: 14 }}>
              <div style={{ fontWeight: 700 }}>{point}</div>
              <div className="section-muted" style={{ marginTop: 6 }}>
                Легкі картки допомагають зосередитись на потрібних даних саме зараз.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
