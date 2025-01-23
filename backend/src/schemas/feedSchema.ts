import { z } from "zod"

export const createFeedSchema = z.object({
  caption: z.string(),
})
