import { fetchProductById } from "../services/fetch-product-by-id";

export const getProductById = (id: string) => { 
  return fetchProductById(id);
}