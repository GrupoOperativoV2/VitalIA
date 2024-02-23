import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del médico es requerido"],
    },
    specialty: {
      type: String,
      required: [true, "La especialidad del médico es requerida"],
    },
    licenseNumber: {
      type: String,
      required: [true, "El número de licencia es requerido"],
      unique: true,
    },
    patients: [{
      type: mongoose.Types.ObjectId,
      ref: "Patient",
    }],
  },
  {
    timestamps: true, // Crea automáticamente campos para 'createdAt' y 'updatedAt'
  }
);

export default mongoose.model("Doctor", doctorSchema);
