import { Product } from "@features/products/core/product";

export interface ProductsSlice {
  isLoading: boolean;
  isError: boolean;
  data: Product[];
}