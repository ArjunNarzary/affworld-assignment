import { Request, Response } from "express"
import { ERROR_MESSAGE } from "../libs"
import {
  deleteTaskById,
  getAllTaskByUser,
  getTaskById,
  insertTask,
  updateTaskDatabase,
} from "../services"
import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId

export const getAllTask = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body.authUser

    const tasks = await getAllTaskByUser({
      userId: _id,
    })

    res.status(200).json({
      success: true,
      tasks,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}

export const createTask = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body.authUser
    const task = await insertTask({
      name: req.body.name,
      description: req.body?.description || "",
      user: _id,
    })

    if (!task) {
      res.status(400).json(ERROR_MESSAGE)
      return
    }

    res.status(201).json({
      success: true,
      task,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body.authUser
    const { taskId } = req.params

    //Validate task_id
    if (!ObjectId.isValid(taskId)) {
      res.status(400).json({
        success: false,
        message: "Invalid task selected",
      })
      return
    }

    const task = await getTaskById(taskId)

    if (!task) {
      res.status(400).json({
        success: false,
        message: "Task not found",
      })
      return
    }

    if (task.user?._id.toString() !== _id.toString()) {
      res.status(401).json({
        success: false,
        message: "You are not allowed to update this task.",
      })
      return
    }

    const modifyTask = await updateTaskDatabase(taskId as string, req.body)

    if (!modifyTask) {
      res.status(500).json(ERROR_MESSAGE)
    }

    const updatedTask = await getTaskById(taskId)

    res.status(200).json({
      success: true,
      task: updatedTask,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body.authUser
    const { taskId } = req.params

    //Validate task_id
    if (!ObjectId.isValid(taskId)) {
      res.status(400).json({
        success: false,
        message: "Invalid task selected",
      })
      return
    }

    const task = await getTaskById(taskId)

    if (!task) {
      res.status(400).json({
        success: false,
        message: "Task not found",
      })
      return
    }

    if (task.user?._id.toString() !== _id.toString()) {
      res.status(401).json({
        success: false,
        message: "You are not allowed to update this task.",
      })
      return
    }

    const removeTask = await deleteTaskById(taskId)

    if (!removeTask) {
      res.status(400).json(ERROR_MESSAGE)
      return
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}
