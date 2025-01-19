import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApiService } from './api-service';
import { getPayments } from '../../application/use-cases/get-payments';
import { Payment } from '../../core/payment';

interface PaymentSlice {
  payments: {
    isLoading: boolean;
    isError: boolean;
    data: Payment[];
  };
}

const initialState: PaymentSlice = {
  payments: {
    isLoading: false,
    isError: false,
    data: [],
  }
};

interface fetchPaymentsParam {
  page: number;
  size: number;
}

export const fetchPayments = createAsyncThunk(
  'user/fetchPayments',
  async ({ page, size }: fetchPaymentsParam) => {
    const data = await getPayments(page, size);
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
