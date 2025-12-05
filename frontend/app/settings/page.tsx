export default function SettingsPage() {
  return (
    <section className="card">
      <div className="section-title">Settings</div>
      <p className="section-muted">Minimal switches to keep the workspace lightweight.</p>
      <div className="grid">
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontWeight: 700 }}>API tokens</div>
          <p className="section-muted">Store provider keys securely and keep them scoped.</p>
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontWeight: 700 }}>Exports</div>
          <p className="section-muted">One-click CSV or image export from any widget.</p>
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontWeight: 700 }}>Alerts</div>
          <p className="section-muted">Quiet notifications for spikes and drops.</p>
        </div>
      </div>
    </section>
  );
}
