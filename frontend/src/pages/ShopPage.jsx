import { useEffect, useMemo, useState } from 'react';
import CategoryFilter from '../components/user/CategoryFilter';
import ProductCard from '../components/user/ProductCard';
import UserHeader from '../components/user/UserHeader';
import useCart from '../hooks/useCart';
import { fetchProducts, fetchProductsByCategory } from '../services/authService';

function ShopPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const categories = useMemo(() => {
    const map = new Set(products.map((item) => item.category).filter(Boolean));
    return Array.from(map);
  }, [products]);

  const loadProducts = async (category = 'all') => {
    setLoading(true);
    setError('');
    try {
      const data =
        category === 'all' ? await fetchProducts() : await fetchProductsByCategory(category);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts('all');
  }, []);

  const onFilter = async (category) => {
    setActiveCategory(category);
    await loadProducts(category);
  };

  const onAddToCart = (product) => {
    addToCart(product);
    setNotice(`${product.title} added to cart.`);
    setTimeout(() => setNotice(''), 1200);
  };

  return (
    <main className="dashboard-shell">
      <UserHeader />

      <section className="panel">
        <h2>Shop Products</h2>
        <p>Filter by category and add items to cart.</p>
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={onFilter}
        />
      </section>

      {notice && (
        <section className="panel">
          <p className="message success">{notice}</p>
        </section>
      )}

      {loading ? (
        <section className="panel">
          <p className="message">Loading products...</p>
        </section>
      ) : error ? (
        <section className="panel">
          <p className="message error">{error}</p>
        </section>
      ) : (
        <section className="shop-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
          ))}
        </section>
      )}
    </main>
  );
}

export default ShopPage;
