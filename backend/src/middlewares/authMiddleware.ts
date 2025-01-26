import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { findUserById } from "../services"

export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Please login first",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    const user = await findUserById((<any>decoded)._id)
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user",
      })
    }

    req.body.authUser = user
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      messgae: "Something went wrong!",
    })
  }
}
