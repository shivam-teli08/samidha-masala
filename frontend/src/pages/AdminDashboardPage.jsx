import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import ImageUploader from '../components/admin/ImageUploader';
import Button from '../components/common/Button';
import StatCard from '../components/dashboard/StatCard';
import {
  addAdminProduct,
  fetchProducts,
  uploadAdminImage,
} from '../services/authService';

const INITIAL_FORM = {
  title: '',
  description: '',
  price: '',
  category: '',
};

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [products, setProducts] = useState([]);
  const [uploadedImage, setUploadedImage] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Loading data...');

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await fetchProducts();
      const list = Array.isArray(data) ? data : data.products || [];
      setProducts(list);
      setStatus('Backend connected');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load products.');
      setStatus('Backend connection failed');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleImageUpload = async (file) => {
    setError('');
    setUploadingImage(true);
    try {
      const response = await uploadAdminImage(file);
      setUploadedImage(response.image || '');
    } catch (err) {
      setError(err.response?.data?.error || 'Image upload failed.');
      setUploadedImage('');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setError('');
    if (!uploadedImage) {
      setError('Upload image before adding product.');
      return;
    }
    setSavingProduct(true);
    try {
      await addAdminProduct({
        ...form,
        price: Number(form.price),
        image: uploadedImage,
      });
      setForm(INITIAL_FORM);
      setUploadedImage('');
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add product.');
    } finally {
      setSavingProduct(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('samidha_admin_auth');
    navigate('/admin/signin', { replace: true });
  };

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage products using backend admin APIs.</p>
        </div>
        <Button type="button" onClick={handleLogout}>
          Admin Logout
        </Button>
      </header>

      <section className="stats-grid">
        <StatCard label="API Status" value={status} accent={error ? 'error' : 'success'} />
        <StatCard label="Products Total" value={products.length} />
        <StatCard label="Image Upload" value={uploadedImage ? 'Ready' : 'Pending'} />
      </section>

      <section className="panel">
        <h2>Add New Product</h2>
        <div className="admin-layout">
          <ImageUploader
            onUpload={handleImageUpload}
            imageUrl={uploadedImage}
            loading={uploadingImage}
          />
          <AdminProductForm
            form={form}
            onChange={onChange}
            onSubmit={handleAddProduct}
            loading={savingProduct}
            imageReady={Boolean(uploadedImage)}
          />
        </div>
        {error && <p className="message error">{error}</p>}
      </section>

      {loadingProducts ? (
        <section className="panel">
          <p className="message">Loading products...</p>
        </section>
      ) : (
        <AdminProductList products={products} />
      )}
    </main>
  );
}

export default AdminDashboardPage;
