import express, { Router } from "express"
import { isAuthenticatedUser } from "../middlewares/authMiddleware"
import { createTask, deleteTask, getAllTask, updateTask } from "../controllers"
import { validateData } from "../middlewares"
import { createTaskSchema, updateTaskSchema } from "../schemas"

const router: Router = express.Router()

router
  .route("/")
  .get(isAuthenticatedUser, getAllTask)
  .post(isAuthenticatedUser, validateData(createTaskSchema), createTask)

router
  .route("/:taskId")
  .put(isAuthenticatedUser, validateData(updateTaskSchema), updateTask)
  .delete(isAuthenticatedUser, deleteTask)

export default router
