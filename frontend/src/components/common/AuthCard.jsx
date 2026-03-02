function AuthCard({ title, subtitle, children, footer }) {
  return (
    <section className="auth-card">
      <header>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>
      {children}
      {footer && <footer>{footer}</footer>}
    </section>
  );
}

export default AuthCard;
