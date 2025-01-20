import { Payment } from "./payment";

export interface PaymentSlice {
  payments: {
    isLoading: boolean;
    isError: boolean;
    data: Payment[];
  };
}
