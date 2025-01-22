import { User } from "../models"
import { userRegistrationSchema } from "../schemas"
import { z } from "zod"
import { Document } from "mongoose"

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

export const findUserById = (id: string) => {
  return User.findById(id)
}
