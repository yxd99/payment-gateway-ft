import { Pagination } from '@features/products/application/ports/pagination';
import { fetchProducts } from '@features/products/application/services/fetch-products';

export const getProducts = (pagination: Pagination) => {
  return fetchProducts(pagination);
};
