import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkoutApiService } from './api-service';

interface PaymentInfo {
  cardNumber: string;
  cvc: string;
  expirationDate: string;
  cardHolder: string;
  installments: number;
}

interface DeliveryInfo {
  address: string;
  city: string;
  state: string;
  phone: string;
}

type StageOfPayment = 0 | 1 | 2;

interface PaymentState {
  paymentInfo: PaymentInfo;
  deliveryInfo: DeliveryInfo;
  stageOfPayment: StageOfPayment;
}

const initialState: PaymentState = {
  paymentInfo: {
    cardNumber: '',
    cvc: '',
    expirationDate: '',
    cardHolder: '',
    installments: 1,
  },
  deliveryInfo: {
    address: '',
    city: '',
    state: '',
    phone: '',
  },
  stageOfPayment: 0,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentInfo(state, action: PayloadAction<PaymentInfo>) {
      state.paymentInfo = action.payload;
    },
    setDeliveryInfo(state, action: PayloadAction<DeliveryInfo>) {
      state.deliveryInfo = action.payload;
    },
    clearStore(state) {
      state.paymentInfo = initialState.paymentInfo;
      state.deliveryInfo = initialState.deliveryInfo;
    },
    setStageOfPayment(state, action: PayloadAction<StageOfPayment>) {
      state.stageOfPayment = action.payload;
    },
  },
});

export const { setPaymentInfo, setDeliveryInfo, clearStore, setStageOfPayment } = paymentSlice.actions;
export const checkoutReducer = {
  [paymentSlice.name]: paymentSlice.reducer,
  [checkoutApiService.reducerPath]: checkoutApiService.reducer,
}
export const checkoutMiddleware = checkoutApiService.middleware;
export default checkoutReducer;
