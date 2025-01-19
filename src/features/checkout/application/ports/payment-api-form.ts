export interface PaymentApiForm {
  cardNumber: string;
  cvc: string;
  expirationDate: string;
  cardHolder: string;
  productId: string;
  installments: number;
  acceptanceToken: string;
  acceptPersonalAuth: string;
}
