import { z } from "zod"

export const createTaskSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export const updateTaskSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(["TODO", "INPROGRESS", "DONE"]),
})
