import express, { Router } from "express"
import {
  forgotPassword,
  googleLogin,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  resetPassword,
} from "../controllers"
import { isAuthenticatedUser, validateData } from "../middlewares"
import {
  forgotPasswordSchema,
  googleAuthSchema,
  resetPasswordSchema,
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas"
import { User } from "../models"

const router: Router = express.Router()
router.route("/").get(async (req, res) => {
  res.status(200).send("Hello World")
})
router
  .route("/register")
  .post(validateData(userRegistrationSchema), registerUser)

router.route("/login").post(validateData(userLoginSchema), loginUser)
router.route("/auth/google").post(validateData(googleAuthSchema), googleLogin)
router
  .route("/forgot-password")
  .post(validateData(forgotPasswordSchema), forgotPassword)
router
  .route("/reset-password")
  .post(validateData(resetPasswordSchema), resetPassword)
router.route("/refresh-token").get(isAuthenticatedUser, refreshToken)
router.route("/logout").put(logoutUser)

export default router
