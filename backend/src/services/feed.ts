import { Feed } from "../models"

export const getAllFeedsByDate = ({
  limit = 20,
  skip = 0,
  date,
}: {
  limit: number
  skip: number
  date?: Date
}) => {
  const requiredDate = date ? new Date(date) : new Date()
  return Feed.find()
    .where({ createdAt: { $lte: requiredDate } })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("user", "name email")
}

export const insertFeed = (feed: any) => {
  return Feed.create(feed)
}
