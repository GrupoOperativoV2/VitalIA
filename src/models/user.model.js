import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date, 
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Masculino', 'Femenino', 'Otro'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
