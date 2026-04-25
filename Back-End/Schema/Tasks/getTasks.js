import * as z from "zod";
export const getTasksSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().max(100).optional(),
  status: z.string().optional(),
  search: z.string().optional(),
});
