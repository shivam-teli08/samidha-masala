import Button from '../common/Button';

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="shop-card">
      <img src={product.image} alt={product.title} />
      <div className="shop-card-body">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="shop-card-meta">
          <strong>INR {Number(product.price).toFixed(2)}</strong>
          <span>{product.category}</span>
        </div>
        <Button type="button" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
