import bcrypt from "bcrypt"
import { CookieOptions, Request, Response } from "express"
import { findByEmail, insertUser } from "../services"
import jwt from "jsonwebtoken"
import { User } from "../models"
import { ERROR_MESSAGE } from "../libs"

const generateToken = (user: InstanceType<typeof User>) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "7d",
    }
  )
}

const getCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: true,
  sameSite: "none",
}

//Match Password
const matchPassword = async function (
  currentPassword: string,
  modelPassword: string
) {
  return await bcrypt.compare(currentPassword, modelPassword)
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    //Check if email already exist
    const emailExist = await findByEmail(req.body.email)
    if (emailExist) {
      res.status(400).json({
        success: false,
        message: "Email is already registered with us",
      })
      return
    }

    const createUser = await insertUser(req.body)

    if (createUser) {
      //create session cookies
      const token = generateToken(createUser)
      createUser.password = ""
      res.status(201).cookie("token", token, getCookieOptions).json({
        success: true,
        message: "Registration successful",
        data: createUser,
        token: token,
      })
    } else {
      res.status(500).json(ERROR_MESSAGE)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await findByEmail(req.body.email, true)

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Email is not registered with us.",
      })
      return
    }
    const checkPassword = await matchPassword(req.body.password, user.password)

    if (!checkPassword) {
      res.status(400).json({
        success: false,
        message: "Password didn't match.",
      })
      return
    }

    const token = generateToken(user)
    user.password = ""
    res.status(201).cookie("token", token, getCookieOptions).json({
      success: true,
      message: "Login successful",
      data: user,
      token: token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}
