import * as z from "zod";
export const updateUserSchema = z.object({
  userName: z.string(),
  password: z.string().min(8),
  currentPassword: z.string().min(8),
});
