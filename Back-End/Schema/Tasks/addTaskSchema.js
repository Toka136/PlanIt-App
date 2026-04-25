import * as z from "zod";
// const taskStatus = require("../utils/taskStatus");
// const taskPeriority = require("../utils/taskPeriority");
export const addTaskSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  dueDate: z.string(),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["Not Started", "In Progress", "Completed"]),
});
