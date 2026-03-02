import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminSignInPage from '../pages/AdminSignInPage';
import CartPage from '../pages/CartPage';
import DashboardPage from '../pages/DashboardPage';
import PaymentCallbackPage from '../pages/PaymentCallbackPage';
import ShopPage from '../pages/ShopPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import AdminProtectedRoute from '../routes/AdminProtectedRoute';
import ProtectedRoute from '../routes/ProtectedRoute';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/admin/signin" element={<AdminSignInPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboardPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <ShopPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/callback"
        element={
          <ProtectedRoute>
            <PaymentCallbackPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default AppRouter;
