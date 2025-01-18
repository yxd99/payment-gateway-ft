import { Product } from "../../core/product";

export interface ProductRepository {
  getProducts(size: number, page: number): Promise<Product[]>;
  getProductById(id: string): Promise<Product>;
}