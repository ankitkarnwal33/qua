import "./individual-layout.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-grid">
      <aside className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="sidebar-nav">
          <a href="/dashboard">Home</a>
          <a href="/dashboard/settings">Settings</a>
        </nav>
      </aside>

      <header className="header">
        <h1>Welcome to the Dashboard</h1>
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
}
