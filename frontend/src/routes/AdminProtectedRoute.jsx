import { Navigate } from 'react-router-dom';

function AdminProtectedRoute({ children }) {
  const isAdminAuthenticated = localStorage.getItem('samidha_admin_auth') === 'true';

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/signin" replace />;
  }

  return children;
}

export default AdminProtectedRoute;
