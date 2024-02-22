import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      floor: {
        type: Number,
        required: true
      },
      building: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true,
        enum: ['individual', 'compartido', 'intensivo']
      },
      status: {
        type: String,
        required: true,
        enum: ['disponible', 'ocupado', 'mantenimiento'],
        default: 'disponible'
      },
      capacity: {
        type: Number,
        required: true
      },
      equipment: [{
        type: String
      }]
    }, 
    { timestamps: true });
    

export default mongoose.model("Room", roomSchema);
