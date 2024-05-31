import mongoose from 'mongoose';
import Messages from "../models/messageModel.js";
import User from "../models/user.model.js";
import MedicalHistory from "../models/medicalHistory.model.js";

export const getMessages = async (req, res, next) => {
  try {

    const { from, to } = req.body;

    console.log("Users1:", from)
    console.log("Users2:", to)

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });


    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    

    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

export const getPatientsForDoctor = async (req, res, next) => {
  try {
    const { doctorId } = req.params;

    const messages = await Messages.find({ 'users.1': doctorId });

    const patientIds = messages.map(message => message.users[0]);

    const uniquePatientIds = [...new Set(patientIds.map(String))];

    const patients = await User.find({ _id: { $in: uniquePatientIds } }, 'name');

    const patientHistories = await MedicalHistory.find({ userId: { $in: uniquePatientIds } });

    const response = patients.map(patient => {
      const history = patientHistories.find(h => h.userId.toString() === patient._id.toString());
      return {
        id:  history ? history.userId : null,
        name: patient.name,
        patientPhoto: history ? history.patientPhoto : null // Incluir el historial médico completo si existe
      };
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
};




