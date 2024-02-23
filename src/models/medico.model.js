import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
  },
  {
    timestamps: true, // Crea automáticamente campos para 'createdAt' y 'updatedAt'
  }
);

export default mongoose.model("Doctor", doctorSchema);
