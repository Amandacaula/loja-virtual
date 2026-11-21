import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const createProduct = async (product) => {
  const { data } = await api.post('/products', product);
  return data;
};

export default api;
