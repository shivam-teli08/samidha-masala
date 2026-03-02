import { Link } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import UserHeader from '../components/user/UserHeader';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

function DashboardPage() {
  const { user } = useAuth();
  const { items, total } = useCart();

  return (
    <main className="dashboard-shell">
      <UserHeader />

      <section className="stats-grid">
        <StatCard label="Logged in as" value={user?.email || 'N/A'} />
        <StatCard label="Cart Items" value={items.length} />
        <StatCard label="Cart Total" value={`INR ${total.toFixed(2)}`} />
      </section>

      <section className="panel quick-links">
        <h2>User Actions</h2>
        <div className="quick-link-grid">
          <Link to="/shop" className="quick-link-card">
            <strong>Browse Products</strong>
            <span>Explore categories and add items to cart.</span>
          </Link>
          <Link to="/cart" className="quick-link-card">
            <strong>Go to Cart</strong>
            <span>Review quantities and place order.</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
