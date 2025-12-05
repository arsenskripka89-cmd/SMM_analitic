const metrics = [
  { account: 'instagram_123', followers: 1200, reach: 5000, er: 5.2 },
  { account: 'tiktok_555', followers: 800, reach: 3200, er: 4.7 }
];

export default function AnalyticsPage() {
  return (
    <section>
      <h2>Analytics Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Followers</th>
            <th>Reach</th>
            <th>ER %</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m) => (
            <tr key={m.account}>
              <td>{m.account}</td>
              <td>{m.followers}</td>
              <td>{m.reach}</td>
              <td>{m.er}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
