import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // o 'Patient' dependiendo de cómo esté estructurada tu base de datos
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Asumiendo que tienes una colección de doctores
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  }
}, {
  timestamps: true, // Para registrar automáticamente la creación y actualización de cada cita
});

export default mongoose.model("Appointment", appointmentSchema);
