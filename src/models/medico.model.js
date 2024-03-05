import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
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
  specialization: { // Campo específico para doctores
    type: String,
    required: true,
  },
  // Puedes considerar si necesitas incluir 'tipo' y 'birthDate' para el doctor también.
  tipo: {
    type: String,
    required: true,
    default: '2', // Suponiendo que '2' podría ser un valor que indique tipo doctor
  },
  birthDate: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true, // Mantiene registro de cuándo se crea y actualiza el documento
});

export default mongoose.model("Doctor", doctorSchema);
