import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader';
import useCart from '../hooks/useCart';
import { getOrderById } from '../services/authService';

function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const { clear } = useCart();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Checking payment status...');
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const verify = async () => {
      const incomingOrderId = searchParams.get('orderId');
      setOrderId(incomingOrderId || '');

      if (!incomingOrderId) {
        setError('Order ID missing in callback.');
        setStatus('Unable to verify payment.');
        setLoading(false);
        return;
      }

      try {
        const response = await getOrderById(incomingOrderId);
        const order = response.order;

        if (order.paymentStatus === 'paid') {
          setStatus('Payment successful. Order confirmed.');
          clear();
        } else if (order.paymentStatus === 'failed') {
          setStatus('Payment failed. Please try again.');
        } else {
          setStatus('Payment is pending confirmation. Please refresh in a moment.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Could not verify payment status.');
        setStatus('Verification failed.');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams, clear]);

  return (
    <main className="dashboard-shell">
      <UserHeader />
      <section className="panel">
        <h2>Payment Callback</h2>
        <p className={error ? 'message error' : 'message'}>{loading ? 'Please wait...' : status}</p>
        {orderId && <p className="message">Order ID: {orderId}</p>}
        {error && <p className="message error">{error}</p>}
        <div className="callback-actions">
          <Link to="/dashboard">Back to Dashboard</Link>
          <Link to="/cart">Go to Cart</Link>
        </div>
      </section>
    </main>
  );
}

export default PaymentCallbackPage;
