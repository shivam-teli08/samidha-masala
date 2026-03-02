function PageShell({ children }) {
  return (
    <main className="page-shell">
      <div className="ambient-shape shape-a" />
      <div className="ambient-shape shape-b" />
      {children}
    </main>
  );
}

export default PageShell;
