import { Feed } from "../models"

export const getAllFeedsData = () => {
  return Feed.find().sort({ createdAt: -1 }).populate("user", "name email")
}

export const insertFeed = (feed: any) => {
  return Feed.create(feed)
}
