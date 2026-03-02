import Button from '../common/Button';

function CheckoutPanel({
  total,
  paymentType,
  setPaymentType,
  onPlaceOrder,
  placingOrder,
  disabled,
  orderResponse,
}) {
  return (
    <section className="panel">
      <h2>Checkout</h2>
      <p>Total: INR {total.toFixed(2)}</p>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="paymentType"
            value="cod"
            checked={paymentType === 'cod'}
            onChange={(event) => setPaymentType(event.target.value)}
          />
          Cash on Delivery
        </label>
        <label>
          <input
            type="radio"
            name="paymentType"
            value="razorpay"
            checked={paymentType === 'razorpay'}
            onChange={(event) => setPaymentType(event.target.value)}
          />
          Razorpay
        </label>
      </div>
      <div className="checkout-btn">
        <Button type="button" onClick={onPlaceOrder} loading={placingOrder} disabled={disabled}>
          Place Order
        </Button>
      </div>
      {orderResponse?.paymentUrl && (
        <p className="message">
          Razorpay link created:{' '}
          <a href={orderResponse.paymentUrl} target="_blank" rel="noreferrer">
            Open payment page
          </a>
        </p>
      )}
      {orderResponse?.order?._id && (
        <p className="message">Order placed successfully. ID: {orderResponse.order._id}</p>
      )}
    </section>
  );
}

export default CheckoutPanel;
