import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApiService } from './api-service';
import { getPayments } from '@features/user/application/use-cases/get-payments';
import { PaymentSlice } from '@features/user/application/ports/payment-slice';
import { Pagination } from '@features/user/application/ports/pagination';

const initialState: PaymentSlice = {
  payments: {
    isLoading: false,
    isError: false,
    data: [],
  }
};

export const fetchPayments = createAsyncThunk(
  'user/fetchPayments',
  async (params: Pagination & { email: string }) => {
    const data = await getPayments(params);
    return data;
  }
);

const paymentsSlice = createSlice({
  name: 'userPayments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPayments.pending, (state) => {
      state.payments.isLoading = true;
    });
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.payments.isLoading = false;
      state.payments.data = action.payload?.payments ?? [];
    });
    builder.addCase(fetchPayments.rejected, (state) => {
      state.payments.isLoading = false;
      state.payments.isError = true;
    });
  },
});

export const paymentReducer = {
  [paymentsSlice.name]: paymentsSlice.reducer, 
  [userApiService.reducerPath]: userApiService.reducer,
};
export const paymentMiddleware = userApiService.middleware;
export default paymentReducer;
