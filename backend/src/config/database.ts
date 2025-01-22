import mongoose from "mongoose"

let url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@freecluster.9n9rx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=FreeCluster`

export const connectDatabase = () => {
  console.log("first", process.env.DB_USER)
  mongoose.connect(url).then(() => console.log("Connected to mongobd database"))
}
