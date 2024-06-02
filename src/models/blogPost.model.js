import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es requerido"],
    },
    content: {
      type: String,
      required: [true, "El contenido es requerido"],
    },
    author: {
      type: String,
      required: [true, "El autor es requerido"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BlogPost", blogPostSchema);
