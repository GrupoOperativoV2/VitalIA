import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  tipo: {
    type: String,
    required: true,
    default: '3',
  },
  birthDate: { // Aquí agregas el nuevo campo para la fecha de nacimiento
    type: Date,
    required: false, // Puedes hacerlo opcional o requerido según tu necesidad
  },
}, {
  timestamps: true,
});

export default mongoose.model("User", userSchema);
