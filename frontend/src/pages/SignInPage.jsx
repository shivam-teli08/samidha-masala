import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthCard from '../components/common/AuthCard';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import PageShell from '../components/common/PageShell';
import useAuth from '../hooks/useAuth';
import { signIn } from '../services/authService';

function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await signIn(form);
      login(data);
      const redirectPath = location.state?.from?.pathname || '/dashboard';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Sign-in failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to continue to the Samidha dashboard."
        footer={
          <p>
            New here? <Link to="/signup">Create account</Link>
            {' | '}
            <Link to="/admin/signin">Admin sign in</Link>
          </p>
        }
      >
        <form className="auth-form" onSubmit={onSubmit}>
          <InputField
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={onChange('email')}
            placeholder="Enter email"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={onChange('password')}
            placeholder="Enter password"
          />
          {error && <p className="message error">{error}</p>}
          <Button type="submit" loading={loading}>
            Sign In
          </Button>
        </form>
      </AuthCard>
    </PageShell>
  );
}

export default SignInPage;
