import * as z from "zod";
export const editTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(2),
  description: z.string().min(5),
  dueDate: z.string(),
  priority: z.string(),
  status: z.string(),
});
