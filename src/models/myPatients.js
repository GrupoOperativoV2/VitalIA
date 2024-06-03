import mongoose from "mongoose";

const myPatientsSchema = new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    historyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicalHistory",
        required: true,
    }
});

export default mongoose.model("myPatients", myPatientsSchema);
