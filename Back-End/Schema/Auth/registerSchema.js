import * as z from "zod";
export const registerSchema = z.object({
  email: z.email(),
  userName: z.string().min(2),
  password: z.string().min(8),
});
