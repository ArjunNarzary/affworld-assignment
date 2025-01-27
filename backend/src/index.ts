import "dotenv/config"
import app from "./app"
import { connectDatabase } from "./config/database"

const port = process.env.PORT

connectDatabase()
  .then(() => {
    console.log("Connected to database")
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log({ err })
    process.exit(1)
  })
