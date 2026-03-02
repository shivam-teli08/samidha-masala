import Button from '../common/Button';

function CartList({ items, onIncrement, onDecrement, onRemove }) {
  if (items.length === 0) {
    return <p className="message">Your cart is empty.</p>;
  }

  return (
    <ul className="cart-list">
      {items.map((item) => (
        <li key={item.productId} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div className="cart-item-body">
            <strong>{item.title}</strong>
            <p>{item.category}</p>
            <p>INR {Number(item.price).toFixed(2)}</p>
          </div>
          <div className="cart-actions">
            <div className="qty-controls">
              <button type="button" onClick={() => onDecrement(item.productId)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button type="button" onClick={() => onIncrement(item.productId)}>
                +
              </button>
            </div>
            <div className="cart-remove-btn">
              <Button type="button" onClick={() => onRemove(item.productId)}>
                Remove
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CartList;
