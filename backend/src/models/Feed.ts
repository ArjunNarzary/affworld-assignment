import mongoose from "mongoose"
const Schema = mongoose.Schema

const feedSchema = new Schema(
  {
    caption: String,
    public_id: String,
    imgUrl: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Feed", feedSchema)
