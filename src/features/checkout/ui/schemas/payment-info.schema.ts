import { z } from "zod";

export const paymentInfoSchema = z.object({ 
  cardNumber: z.string().min(16).max(16),
  cvc: z.string().min(3).max(4),
  expirationDate: z.string().max(5),
  cardHolder: z.string().min(2).max(30),
  installments: z.number().min(1).max(10),
  email: z.string().email(),
});
