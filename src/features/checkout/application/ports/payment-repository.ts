import { Payment } from "@features/checkout/core/payment";
import { PaymentApiForm } from "./payment-api-form";
import { PaymentAcceptanceApiTokenResponse } from "./payment-acceptance-api-token-response";

export interface PaymentRepository {
  submitPayment(paymentData: PaymentApiForm): Promise<Payment>;
  fetchAcceptanceToken(): Promise<PaymentAcceptanceApiTokenResponse>;
}
