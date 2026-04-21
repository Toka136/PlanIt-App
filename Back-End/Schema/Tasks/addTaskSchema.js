import * as z from "zod";
export const addTaskSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  dueDate: z.date(),
  priority: z.string(),
  status: z.string(),
});
