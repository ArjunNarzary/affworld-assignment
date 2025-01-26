import bcrypt from "bcrypt"
import { CookieOptions, Request, Response } from "express"
import {
  findByEmail,
  findUserById,
  insertUser,
  updateUserById,
} from "../services"
import jwt from "jsonwebtoken"
import { User } from "../models"
import { ERROR_MESSAGE } from "../libs"

const getCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: true,
  sameSite: "none",
}

const generateToken = (
  user: InstanceType<typeof User>,
  expires: string = "7d"
) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: expires,
    }
  )
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
        user: createUser,
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
      user: user,
      token: token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}

//Generate reset url for password reset
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const user = await findByEmail(req.body.email)

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Email is not registered with us.",
      })
      return
    }

    //Generate reset token
    const token = generateToken(user, "15m")
    const redirectUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`
    //Here you can send email to user with reset url

    res.status(200).json({
      success: true,
      message: "Password reset link.",
      redirectUrl: redirectUrl,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}

//Reset password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    //check if token expired
    if (Date.now() > (<any>decoded).exp * 1000) {
      res.status(400).json({
        success: false,
        message: "Token expired",
      })
      return
    }

    const user = await findUserById((<any>decoded)._id)

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Email is not registered with us.",
      })
      return
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const updatedUser = await updateUserById(user._id as string, {
      password: hashPassword,
      name: user.name,
      email: user.email,
    })

    if (!updatedUser) {
      res.status(400).json({
        success: false,
        message: "Failed to update password",
      })
      return
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.status(200).clearCookie("token").json({
      success: true,
      message: "Logout successful",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_MESSAGE)
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { authUser } = req.body

    //create new session cookies
    const token = generateToken(authUser, "15m")
    res.status(201).cookie("token", token, getCookieOptions).json({
      success: true,
      message: "Registration successful",
      user: authUser,
      token: token,
    })
  } catch (error) {
    res.status(500).json(ERROR_MESSAGE)
  }
}
