import Button from '../common/Button';
import InputField from '../common/InputField';

function AdminProductForm({ form, onChange, onSubmit, loading, imageReady }) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h3>2. Add Product Details</h3>
      <InputField
        id="title"
        label="Title"
        value={form.title}
        onChange={onChange('title')}
        placeholder="Product title"
      />
      <label className="input-group" htmlFor="description">
        <span>Description</span>
        <textarea
          id="description"
          value={form.description}
          onChange={onChange('description')}
          placeholder="Product description"
          rows={4}
          required
        />
      </label>
      <InputField
        id="price"
        label="Price"
        type="number"
        value={form.price}
        onChange={onChange('price')}
        placeholder="Product price"
      />
      <InputField
        id="category"
        label="Category"
        value={form.category}
        onChange={onChange('category')}
        placeholder="Category name"
      />
      <div className="admin-inline-btn">
        <Button type="submit" loading={loading} disabled={!imageReady}>
          Add Product
        </Button>
      </div>
      {!imageReady && (
        <p className="message">Upload an image first to enable product creation.</p>
      )}
    </form>
  );
}

export default AdminProductForm;
