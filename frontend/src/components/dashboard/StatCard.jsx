function StatCard({ label, value, accent = 'default' }) {
  return (
    <article className={`stat-card ${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default StatCard;
