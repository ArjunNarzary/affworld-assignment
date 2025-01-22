import { createTaskSchema, updateTaskSchema } from "./../schemas/taskSchema"
import { Task } from "../models"
import { z } from "zod"

export const getAllTaskByUser = ({ userId }: { userId: string }) => {
  return Task.find().where({ user: userId }).sort({ updatedAt: -1 })
}

export const insertTask = (
  task: z.infer<typeof createTaskSchema> & { user: string }
) => {
  return Task.create(task)
}

export const getTaskById = (id: string) => {
  return Task.findById(id).populate("user", "_id name email")
}

export const updateTaskDatabase = (
  id: string,
  data: z.infer<typeof updateTaskSchema>
) => {
  return Task.updateOne({ _id: id }, { $set: data })
}

export const deleteTaskById = (id: string) => {
  return Task.deleteOne({ _id: id })
}
