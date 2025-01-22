import express, { Request, Response } from "express"
import cookieParser from "cookie-parser"
import { task, user } from "./routes"

const versionUrl = "/api/v1"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(`${versionUrl}/user`, user)
app.use(`${versionUrl}/task`, task)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server")
})

export default app
