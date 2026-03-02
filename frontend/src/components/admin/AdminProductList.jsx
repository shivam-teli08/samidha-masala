function AdminProductList({ products }) {
  return (
    <section className="panel">
      <h2>Current Products</h2>
      {products.length === 0 ? (
        <p className="message">No products found.</p>
      ) : (
        <ul className="admin-product-grid">
          {products.map((item) => (
            <li key={item._id || item.title} className="admin-product-card">
              <img src={item.image} alt={item.title || 'Product'} />
              <div>
                <strong>{item.title || 'Untitled Product'}</strong>
                <p>{item.category || 'Uncategorized'}</p>
                <p>INR {item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default AdminProductList;
