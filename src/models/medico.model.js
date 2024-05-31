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
    specialization: { 
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    experience: {
      type: Number, // Cambiado a Number ya que es una cantidad de años
      required: true,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    tipo: {
      type: String,
      required: true,
      default: '2',
    },
    doctorPhoto: { 
      type: String, 
      trim: true 
    },
  }, {
    timestamps: true, // Mantiene registro de cuándo se crea y actualiza el documento
  });

  export default mongoose.model("Doctor", doctorSchema);
