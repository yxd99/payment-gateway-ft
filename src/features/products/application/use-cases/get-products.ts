import { Pagination } from '../ports/pagination';
import { fetchProducts } from '../services/fetch-products';

export const getProducts = (pagination: Pagination) => {
  return fetchProducts(pagination);
};
