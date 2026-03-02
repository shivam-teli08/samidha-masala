import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/common/AuthCard';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import PageShell from '../components/common/PageShell';
import { adminSignIn } from '../services/authService';

function AdminSignInPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('samidha_admin_auth') === 'true') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await adminSignIn(form);
      localStorage.setItem('samidha_admin_auth', 'true');
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Admin sign-in failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <AuthCard
        title="Admin Sign In"
        subtitle="Access admin controls for Samidha Masala."
        footer={
          <p>
            User account? <Link to="/signin">Go to user sign in</Link>
          </p>
        }
      >
        <form className="auth-form" onSubmit={onSubmit}>
          <InputField
            id="username"
            label="Username"
            value={form.username}
            onChange={onChange('username')}
            placeholder="Enter admin username"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={onChange('password')}
            placeholder="Enter admin password"
          />
          {error && <p className="message error">{error}</p>}
          <Button type="submit" loading={loading}>
            Sign In as Admin
          </Button>
        </form>
      </AuthCard>
    </PageShell>
  );
}

export default AdminSignInPage;
