import { User } from "../models"
import { userRegistrationSchema } from "../schemas"
import { z } from "zod"

export const insertUser = async (
  user: z.infer<typeof userRegistrationSchema>
) => {
  return await User.create(user)
}

export const findByEmail = (email: string, showPassword: boolean = false) => {
  if (showPassword) {
    return User.where({ email }).findOne().select("+password")
  } else {
    return User.where({ email }).findOne()
  }
}

export const findUserById = (
  id: string
): Promise<{
  _id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: string
} | null> => {
  return User.findById(id)
}

export const updateUserById = (
  id: string,
  data: z.infer<typeof userRegistrationSchema>
) => {
  return User.updateOne({ _id: id }, { $set: data })
}
