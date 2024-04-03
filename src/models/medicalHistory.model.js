import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactName: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactRelation: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    pastDiseases: {
      type: String,
      required: false,
      trim: true,
    },
    surgeries: {
      type: String,
      required: false,
      trim: true,
    },
    bloodType: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Esto asegura que solo se puedan asignar los valores enumerados
    },
    hospitalizations: {
      type: String,
      required: false,
      trim: true,
    },
    allergies: {
      type: String,
      required: false,
      trim: true,
    },
    currentMedications: {
      type: String,
      required: false,
      trim: true,
    },
    familyHistory: {
      type: String,
      required: false,
      trim: true,
    },
    lifestyle: {
      diet: {
        type: String,
        trim: true,
      },
      exercise: {
        type: String,
        trim: true,
      },
      alcohol: {
        type: String,
        trim: true,
      },
      smoking: {
        type: String,
        trim: true,
      },
    },
    vaccinations: {
      type: String,
      required: false,
      trim: true,
    },
    labResults: {
      type: String,
      required: false,
      trim: true,
    },
    patientPhoto: {
      type: String, // Puedes almacenar la ruta del archivo o el identificador único si estás usando un servicio como GridFS o S3
      required: false,
    },
    // Agregando los nuevos campos
    weight: {
      type: Number, // Puede ser en kg o lbs según la necesidad
      required: true,
    },
    height: {
      type: Number, // Puede ser en cm o pulgadas según la necesidad
      required: true,
    },
    bloodPressure: {
      type: String, // Formato típico puede ser '120/80'
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("MedicalHistory", medicalHistorySchema);
