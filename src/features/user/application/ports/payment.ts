export interface Payment {
  id: string;
  reference: string;
  amount: string;
  transactionId: string;
  createdAt: Date;
  customerEmail: string;
  status: string;
  address: string;
  city: string;
  phone: string;
  state: string;
  productQuantity: number;
}
