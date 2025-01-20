export class Payment {
  constructor(
    public id: string,
    public product: {
      id: string;
      name: string;
      price: number;
      imageUrl: string;
      stock: number;
    },
    public amount: number,
    public transactionId: string,
    public createdAt: string,
    public reference: string,
    public customerEmail: string,
    public productQuantity: number,
    public status: string,
    public statusMessage: string,
    public address: string,
    public city: string,
    public phone: string,
    public department: string
  ) {}
}
