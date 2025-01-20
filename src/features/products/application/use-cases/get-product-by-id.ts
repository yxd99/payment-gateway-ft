import { fetchProductById } from "@features/products/application/services/fetch-product-by-id";

export const getProductById = (id: string) => { 
  return fetchProductById(id);
}