import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';

function UserHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { items } = useCart();

  const onLogout = () => {
    logout();
    navigate('/signin', { replace: true });
  };

  return (
    <header className="user-header">
      <div>
        <h1>Samidha Masala</h1>
        <p>Welcome, {user?.name || 'User'}</p>
      </div>
      <nav className="user-nav">
        <Link to="/dashboard">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart ({items.length})</Link>
        <Button type="button" onClick={onLogout}>
          Logout
        </Button>
      </nav>
    </header>
  );
}

export default UserHeader;
