import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/common/AuthCard';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import PageShell from '../components/common/PageShell';
import useAuth from '../hooks/useAuth';
import { signUp } from '../services/authService';

function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phoneno: '', password: '' });
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
      const data = await signUp(form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign-up failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <AuthCard
        title="Create your account"
        subtitle="Start managing your Samidha Masala customer experience."
        footer={
          <p>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        }
      >
        <form className="auth-form" onSubmit={onSubmit}>
          <InputField
            id="name"
            label="Full Name"
            value={form.name}
            onChange={onChange('name')}
            placeholder="Enter full name"
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={onChange('email')}
            placeholder="Enter email"
          />
          <InputField
            id="phoneno"
            label="Phone Number"
            value={form.phoneno}
            onChange={onChange('phoneno')}
            placeholder="10 digit phone number"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={onChange('password')}
            placeholder="Create password"
          />
          {error && <p className="message error">{error}</p>}
          <Button type="submit" loading={loading}>
            Create Account
          </Button>
        </form>
      </AuthCard>
    </PageShell>
  );
}

export default SignUpPage;
