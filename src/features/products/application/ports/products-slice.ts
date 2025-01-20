import { Product } from "../../core/product";

export interface ProductsSlice {
  isLoading: boolean;
  isError: boolean;
  data: Product[];
}