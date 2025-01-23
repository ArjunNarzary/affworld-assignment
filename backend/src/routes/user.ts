import express, { Router } from "express"
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers"
import { validateData } from "../middlewares"
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas"

const router: Router = express.Router()

router
  .route("/register")
  .post(validateData(userRegistrationSchema), registerUser)

router.route("/login").post(validateData(userLoginSchema), loginUser)
router
  .route("/forgot-password")
  .post(validateData(forgotPasswordSchema), forgotPassword)
router
  .route("/reset-password")
  .post(validateData(resetPasswordSchema), resetPassword)

export default router
