import "dotenv/config"
import app from "./app"
import { connectDatabase } from "./config/database"

const port = process.env.PORT || 8000

connectDatabase()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
