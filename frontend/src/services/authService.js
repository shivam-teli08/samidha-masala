import apiClient from './apiClient';

export async function signUp(payload) {
  const { data } = await apiClient.post('/user/auth/sign-up', payload);
  return data;
}

export async function signIn(payload) {
  const { data } = await apiClient.post('/user/auth/sign-in', payload);
  return data;
}

export async function fetchProducts() {
  const { data } = await apiClient.get('/user/products');
  return data;
}

export async function fetchProductsByCategory(category) {
  const { data } = await apiClient.get(`/user/products/category/${category}`);
  return data;
}

export async function placeOrder(payload) {
  const { data } = await apiClient.post('/orders/place-order', payload);
  return data;
}

export async function getOrderById(orderId) {
  const { data } = await apiClient.get(`/orders/${orderId}`);
  return data;
}

export async function adminSignIn(payload) {
  const { data } = await apiClient.post('/admin', payload);
  return data;
}

export async function uploadAdminImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await apiClient.post('/admin/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function addAdminProduct(payload) {
  const { data } = await apiClient.post('/admin/add-product', payload);
  return data;
}
