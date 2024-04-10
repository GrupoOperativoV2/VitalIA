import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  personalInformation: {
    name: { type: String, required: true, trim: true },
    birthdate: { type: Date, required: true },
    gender: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true }
  },
  physicalInformation: {
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    bloodPressure: { type: String, required: true }
  },
  emergencyInformation: {
    contactName: { type: String, required: true, trim: true },
    contactRelation: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true }
  },
  medicalHistory: {
    bloodType: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Esto asegura que solo se puedan asignar los valores enumerados
    },
    diseases: [String],
    surgeries: [String],
    hospitalizations: [String],
    allergies: [String],
    familyHistory: [String],
    medications: [{
      name: { type: String, trim: true },
      dose: { type: String, trim: true }
    }]
  },
  lifestyle: {
    diet: {
      vegetarian: { type: Boolean, default: false },
      glutenFree: { type: Boolean, default: false },
      vegan: { type: Boolean, default: false },
      keto: { type: Boolean, default: false },
      paleo: { type: Boolean, default: false },
      description: { type: String, trim: true }
    },
    exercise: { type: String, trim: true },
    alcoholConsumption: { type: String, trim: true },
    smokingHabits: { type: String, trim: true }
  },
  vaccinations: {
    influenza: { type: Boolean, default: false },
    tetanus: { type: Boolean, default: false },
    hepatitisB: { type: Boolean, default: false },
    measles: { type: Boolean, default: false },
    covid19: { type: Boolean, default: false },
    otherVaccinations: { type: String, trim: true }
  },
  labResults: { type: String, trim: true },
  patientPhoto: { type: String, trim: true }
}, { timestamps: true });

const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema);
export default MedicalHistory;
