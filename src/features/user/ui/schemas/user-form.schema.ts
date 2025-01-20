import { z } from "zod";

export const userFormSchema = z.object({ 
  email: z.string().email(),
});
