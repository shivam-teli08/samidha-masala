import { useState } from 'react';
import CartList from '../components/user/CartList';
import CheckoutPanel from '../components/user/CheckoutPanel';
import UserHeader from '../components/user/UserHeader';
import useCart from '../hooks/useCart';
import { placeOrder } from '../services/authService';

function CartPage() {
  const { items, total, increment, decrement, remove, clear } = useCart();
  const [paymentType, setPaymentType] = useState('cod');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState('');
  const [orderResponse, setOrderResponse] = useState(null);

  const onPlaceOrder = async () => {
    if (items.length === 0) return;
    setError('');
    setPlacingOrder(true);
    setOrderResponse(null);

    try {
      const payload = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        total,
        paymentType,
      };
      const response = await placeOrder(payload);
      setOrderResponse(response);

      if (paymentType === 'cod') {
        clear();
      } else if (response?.paymentUrl) {
        window.location.href = response.paymentUrl;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Order placement failed.');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <main className="dashboard-shell">
      <UserHeader />

      <section className="panel">
        <h2>Your Cart</h2>
        <CartList items={items} onIncrement={increment} onDecrement={decrement} onRemove={remove} />
      </section>

      <CheckoutPanel
        total={total}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
        onPlaceOrder={onPlaceOrder}
        placingOrder={placingOrder}
        disabled={items.length === 0}
        orderResponse={orderResponse}
      />

      {error && (
        <section className="panel">
          <p className="message error">{error}</p>
        </section>
      )}
    </main>
  );
}

export default CartPage;
