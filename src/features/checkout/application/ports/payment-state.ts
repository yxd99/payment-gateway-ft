import { DeliveryInfo } from "./delivery-info";
import { PaymentInfo } from "./payment-info";

export type StageOfPayment = 0 | 1 | 2;

export interface PaymentState {
  paymentInfo: PaymentInfo;
  deliveryInfo: DeliveryInfo;
  stageOfPayment: StageOfPayment;
}
