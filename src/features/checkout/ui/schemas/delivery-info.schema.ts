import { z } from "zod";

export const deliveryInfoSchema = z.object({
  address: z.string().min(5).max(50),
  city: z.string().min(2).max(30),
  department: z.string().min(2).max(30),
  phone: z.string().min(5).max(20),
});
