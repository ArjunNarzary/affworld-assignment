import express, { Router } from "express"
import { isAuthenticatedUser } from "../middlewares/authMiddleware"
import { upload, validateData } from "../middlewares"
import { createFeed, getAllFeeds } from "../controllers"

const router: Router = express.Router()

router
  .route("/")
  .get(isAuthenticatedUser, getAllFeeds)
  .post(isAuthenticatedUser, upload.single("image"), createFeed)

export default router
