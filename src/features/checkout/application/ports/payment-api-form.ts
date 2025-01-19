export interface PaymentApiForm {
  cardNumber: string;
  cvc: string;
  expirationDate: string;
  cardHolder: string;
  productId: string;
  installments: number;
  email: string;
  acceptanceToken: string;
  acceptPersonalAuth: string;
}
