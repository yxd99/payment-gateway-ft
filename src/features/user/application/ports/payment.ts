import { Product } from "./product";

export interface Payment {
  id: string;
  reference: string;
  amount: number;
  transactionId: string;
  createdAt: string;
  customerEmail: string;
  status: string;
  address: string;
  city: string;
  phone: string;
  department: string;
  productQuantity: number;
  product: Product;
}
