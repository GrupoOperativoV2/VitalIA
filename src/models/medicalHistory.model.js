import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalInformation: {
      name: { type: String, required: true, trim: true },
      birthdate: { type: Date, required: true },
      gender: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      contactNumber: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
    },
    physicalInformation: {
      weight: { type: Number, required: true },
      height: { type: Number, required: true },
      bloodPressure: { type: String, required: true },
    },
    emergencyInformation: {
      contactName: { type: String, required: true, trim: true },
      contactRelation: { type: String, required: true, trim: true },
      contactNumber: { type: String, required: true, trim: true },
    },
    medicalHistory: {
      bloodType: {
        type: String,
        required: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Esto asegura que solo se puedan asignar los valores enumerados
      },
      diseases: {
        diabetes: { type: Boolean, default: false },
        hypertension: { type: Boolean, default: false },
        obesity: { type: Boolean, default: false },
        cardiovascular: { type: Boolean, default: false },
        otherDiseases: { type: String, trim: true },
      },
      surgeries:  {
        appendectomy: { type: Boolean, default: false },
        cholecystectomy: { type: Boolean, default: false },
        herniaRepair: { type: Boolean, default: false },
        hipReplacement: { type: Boolean, default: false },
        kneeReplacement: { type: Boolean, default: false },
        otherSurgeries: { type: String, trim: true },
      },
      hospitalizations: [
      {
        description: { type: String, required: true, trim: true },
        date: { type: Date, required: true }
      }
    ],
      allergies: {
        pollen: { type: Boolean, default: false },
        dust: { type: Boolean, default: false },
        nuts: { type: Boolean, default: false },
        latex: { type: Boolean, default: false },
        animalDander: { type: Boolean, default: false },
        otherAllergies: { type: String, trim: true },
      },
      familyHistory: {
        familyHypertension: { type: Boolean, default: false },
        familyCardiacDiseases: { type: Boolean, default: false },
        familyCancer: { type: Boolean, default: false },
        familyAutoimmuneDiseases: { type: Boolean, default: false },
        otherFamilyDiseases: { type: String, trim: true },
      },
      medications: [
        {
          name: { type: String, trim: true },
          dose: { type: String, trim: true },
        },
      ],
    },
    lifestyle: {
      diet: {
        vegetarian: { type: Boolean, default: false },
        glutenFree: { type: Boolean, default: false },
        vegan: { type: Boolean, default: false },
        keto: { type: Boolean, default: false },
        paleo: { type: Boolean, default: false },
        description: { type: String, trim: true },
      },
      exercise: { type: String, trim: true },
      alcoholConsumption: { type: String, trim: true },
      smokingHabits: { type: String, trim: true },
    },
    vaccinations: {
      influenza: { type: Boolean, default: false }, 
      tetanus: { type: Boolean, default: false },
      hepatitisB: { type: Boolean, default: false },
      measles: { type: Boolean, default: false },
      covid19: { type: Boolean, default: false },
      otherVaccinations: { type: String, trim: true },
    },
    labResults: [
      {
        date: { type: Date, required: true },
        diagnosis: { type: String, required: true, trim: true },
        doctor: { type: String, required: true, trim: true },
        aspect: { type: String, trim: true },
        results: { type: String, trim: true }
      }
    ],
    patientPhoto: { type: String, trim: true },
  },
  { timestamps: true }
);

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);
export default MedicalHistory;
