export default function SettingsPage() {
  return (
    <section className="card">
      <div className="section-title">Налаштування</div>
      <p className="section-muted">Мінімум перемикачів, щоб робочий простір залишався легким.</p>
      <div className="grid">
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontWeight: 700 }}>API токени</div>
          <p className="section-muted">Зберігайте ключі сервісів захищено та з потрібними правами.</p>
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontWeight: 700 }}>Експорти</div>
          <p className="section-muted">Експорт у CSV чи зображення в один клік з будь-якого віджета.</p>
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontWeight: 700 }}>Сповіщення</div>
          <p className="section-muted">Непомітні нотифікації про сплески та просідання.</p>
        </div>
      </div>
    </section>
  );
}
