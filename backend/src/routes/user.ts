import express, { Router } from "express"
import { loginUser, registerUser } from "../controllers"
import { validateData } from "../middlewares"
import { userLoginSchema, userRegistrationSchema } from "../schemas"

const router: Router = express.Router()

router
  .route("/register")
  .post(validateData(userRegistrationSchema), registerUser)

router.route("/login").post(validateData(userLoginSchema), loginUser)

export default router
