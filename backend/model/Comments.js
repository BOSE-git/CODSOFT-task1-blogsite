import mongoose from "mongoose";
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    blog: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  });
  
  export default mongoose.model("Comment", commentSchema);