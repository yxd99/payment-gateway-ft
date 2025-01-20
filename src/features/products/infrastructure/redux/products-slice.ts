import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../core/product';
import { getProducts } from '../../application/use-cases/get-products';
import { productsApiService } from './api-service';

interface ProductsSlice {
  isLoading: boolean;
  isError: boolean;
  data: Product[];
}

const initialState: ProductsSlice = {
  isLoading: false,
  isError: false,
  data: [],
};

interface Pagination {
  page: number;
  size: number;
}

export const fetchPayments = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, size }: Pagination) => {
    return getProducts({ page, size });
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPayments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload?.products ?? [];
    });
    builder.addCase(fetchPayments.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const productsReducer = {
  [productsSlice.name]: productsSlice.reducer,
  [productsApiService.reducerPath]: productsApiService.reducer,
};
export const productsMiddleware = productsApiService.middleware;
export default productsReducer;
