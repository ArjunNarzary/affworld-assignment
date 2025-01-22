import mongoose from "mongoose"
const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    name: String,
    description: String,
    status: {
      type: String,
      enum: ["TODO", "INPROGRESS", "COMPLETE"],
      default: "TODO",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Task", taskSchema)
