import { Request, Response, NextFunction } from "express"
import { z, ZodError } from "zod"

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          [issue.path.join(".")]: issue.message,
        }))

        res.status(400).json({
          success: false,
          message: "Invalid data",
          details: errorMessages,
        })
      } else {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" })
      }
    }
  }
}
