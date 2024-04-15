// models/recoveryToken.model.js
import mongoose from "mongoose";

const recoveryTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // El token expira después de 1 hora
  }
});

export default mongoose.model("RecoveryToken", recoveryTokenSchema);
