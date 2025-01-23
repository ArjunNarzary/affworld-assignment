import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname)
    cb(null, path.join(__dirname, "../../public/uploads"))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  },
})

export const upload = multer({ storage })
