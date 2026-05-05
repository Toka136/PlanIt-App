import * as z from "zod";
export const updateUserSchema = z.object({
  userName: z.string().optional(),
  password: z.string().min(8).optional(),
  currentPassword: z.string().min(8).optional(),
});
