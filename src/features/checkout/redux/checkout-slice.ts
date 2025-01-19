import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentInfo {
  cardNumber: string;
  cvc: string;
  expirationDate: string;
  cardHolder: string;
  installments: number;
  email: string;
}

interface DeliveryInfo {
  address: string;
  city: string;
  state: string;
  phone: string;
}

interface PaymentState {
  acceptanceToken: string;
  personalAuthToken: string;
  paymentInfo: PaymentInfo;
  deliveryInfo: DeliveryInfo;
}

const initialState: PaymentState = {
  acceptanceToken: '',
  personalAuthToken: '',
  paymentInfo: {
    cardNumber: '',
    cvc: '',
    expirationDate: '',
    cardHolder: '',
    installments: 1,
    email: '',
  },
  deliveryInfo: {
    address: '',
    city: '',
    state: '',
    phone: '',
  },
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<PaymentState>) {
      state.acceptanceToken = action.payload.acceptanceToken;
      state.personalAuthToken = action.payload.personalAuthToken;
    },
    resetTokens(state) {
      state.acceptanceToken = '';
      state.personalAuthToken = '';
    },
    setPaymentInfo(state, action: PayloadAction<PaymentInfo>) {
      state.paymentInfo = action.payload;
    },
    setDeliveryInfo(state, action: PayloadAction<DeliveryInfo>) {
      state.deliveryInfo = action.payload;
    },
  },
});

export const { setTokens, resetTokens, setPaymentInfo, setDeliveryInfo } = paymentSlice.actions;
export default paymentSlice.reducer;
