import { Product } from '@features/products/core/product';
import { Pagination } from './pagination';

export interface ProductRepository {
  getProducts(pagination: Pagination): Promise<Product[]>;
  getProductById(id: string): Promise<Product>;
}