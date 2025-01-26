import fs from "fs"
import { get } from "http"
import multer from "multer"
import path from "path"

const getPath = () => {
  const uploadDir = path.join(__dirname, "../../public/uploads")
  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }) // Creates the folder recursively if it doesn't exist
  }

  return path.join(__dirname, "../../public/uploads")
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, getPath())
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  },
})

export const upload = multer({ storage })
