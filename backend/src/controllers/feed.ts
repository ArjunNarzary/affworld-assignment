import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { ERROR_MESSAGE } from "../libs"
import { findUserById, getAllFeedsData, insertFeed } from "../services"
import { uploadOnCloudinary } from "../config/cloudinary"

export const getAllFeeds = async (req: Request, res: Response) => {
  try {
    const feeds = await getAllFeedsData()

    res.status(200).json({
      success: true,
      feeds,
    })
  } catch (error) {
    res.status(500).json(ERROR_MESSAGE)
  }
}

export const createFeed = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    const user = await findUserById((<any>decoded)._id)

    const { caption } = req.body

    if (!req?.file?.path) {
      res.status(500).json(ERROR_MESSAGE)
      return
    }
    const result = await uploadOnCloudinary(req?.file?.path || "")

    if (!result) {
      res.status(500).json(ERROR_MESSAGE)
      return
    }

    const feed = await insertFeed({
      caption,
      imgUrl: result?.url,
      public_id: result?.public_id,
      user: user?._id,
    })

    if (!feed) {
      res.status(500).json(ERROR_MESSAGE)
      return
    }

    res.status(201).json({
      success: true,
      feed,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}
