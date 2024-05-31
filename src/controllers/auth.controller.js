import User from "../models/user.model.js";
import Doctor from "../models/medico.model.js";
import Manager from "../models/manager.model.js";
import MedicalHistory from '../models/medicalHistory.model.js '; 
import RecoveryToken from "../models/recoveryToken.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import { registerSchema, registerDoctorSchema} from "../schemas/auth.schema.js";
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las fotos
  },
  filename: function (req, file, cb) {
    cb(null, 'doctorPhoto-' + Date.now() + path.extname(file.originalname)); // Nombre del archivo con prefijo
  },
});

export const upload = multer({ storage: storage });

export const registerDoctor = async (req, res) => {
  try {
    const { name, email, specialization, password, birthDate, phone, address, experience } = req.body;
    const doctorPhoto = req.file ? req.file.filename : null;

    console.log(req.body);

    const parsedData = registerDoctorSchema.safeParse({ name, email, specialization, password, birthDate, phone, address, experience, doctorPhoto });
    if (!parsedData.success) {
      return res.status(400).json({
        message: parsedData.error.issues.map(issue => issue.message),
      });
    }

    const userFound = await Doctor.findOne({ email });

    if (userFound) {
      return res.status(400).json({
        message: ["El correo electrónico ya está en uso"],
      });
    }

    // Se hashea el password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = new Doctor({
      name,
      email,
      specialization,
      password: passwordHash,
      birthDate,
      phone,
      address,
      experience,
      doctorPhoto: doctorPhoto ? `/uploads/${doctorPhoto}` : null, // Guardar la ruta de la foto
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id,
      name: userSaved.name,
      tipo: userSaved.tipo,
      doctorPhoto: userSaved.doctorPhoto
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.name,
      email: userSaved.email,
      doctorPhoto: userSaved.doctorPhoto

    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, username, email, password, birthDate } = req.body;

    const parsedData = registerSchema.safeParse({ name, username, email, password, birthDate });
    if (!parsedData.success) {
      return res.status(400).json({
        message: parsedData.error.issues.map(issue => issue.message),
      });
    }

    const [emailFoundInUsers, usernameFound, emailFoundInDoctors] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username }),
      Doctor.findOne({ email }), 
    ]);

    let errors = [];

    if (emailFoundInUsers || emailFoundInDoctors) errors.push("The email is already in use");
    if (usernameFound) errors.push("The username is already in use");

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors,
      });
    }

    // Continúa con el proceso de registro
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: passwordHash,
      birthDate,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id,
      username: userSaved.username,
      tipo: userSaved.tipo,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      name: userSaved.name,
      tipo: userSaved.tipo,
      birthDate: userSaved.birthDate  
  });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let errors = [];

    let userFound = await User.findOne({ email });
    if (!userFound) {
      userFound = await Doctor.findOne({ email });
    }
    if (!userFound) {
      userFound = await Manager.findOne({ email });
    }

    if (!userFound) {
      errors.push("The email does not exist");
    }

    let isMatch = false;
    if (userFound) {
      isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        errors.push("The password is incorrect");
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors,
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username || userFound.name, 
      tipo: userFound.tipo,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure en producción
      sameSite: "none",
    });

    return res.json({
      id: userFound._id,
      username: userFound.username || userFound.name, 
      email: userFound.email,
      name: userFound.name,
      tipo: userFound.tipo,
      birthDate: userFound.birthDate,
      doctorPhoto: userFound.doctorPhoto || null,
      token: token // Include token in the response JSON
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Acepta token de cookies o headers
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) {
      return res.sendStatus(401);
    }


    let userFound = await User.findById(user.id);
    if (!userFound) {
      userFound = await Doctor.findById(user.id);
    }
    if (!userFound) {
      userFound = await Manager.findById(user.id);
    }
    if (!userFound) {
      return res.sendStatus(401);
    }

    const responseData = {
      id: userFound._id,
      username: userFound.username || userFound.name,
      email: userFound.email,
      name: userFound.name,
      tipo: userFound.tipo,
      birthDate: userFound.birthDate,
      doctorPhoto: userFound.doctorPhoto || null,
    };


    return res.json(responseData);
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const getMedicalHistoryPhoto = async (req, res) => {
  const { userId } = req.params; // Suponiendo que el ID de usuario se pasa como parámetro en la URL

  try {
    const medicalHistory = await MedicalHistory.findOne({ userId });

    if (!medicalHistory) {
      return res.status(404).json({ message: 'No se encontró historial médico para este usuario.' });
    }

    const photoPath = medicalHistory.patientPhoto;

    res.status(200).json({ photoPath });
  } catch (error) {
    console.error('Error al obtener la ruta de la foto del paciente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};


const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    "217205102651-2vefguedu5qsou1t1o7h4blr7dotvvoj.apps.googleusercontent.com", // Client ID
    "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", // Client Secret
    "https://developers.google.com/oauthplayground" 
  );

  oauth2Client.setCredentials({
    refresh_token: "1//04KMuLu9T8HJHCgYIARAAGAQSNwF-L9Iro8yQqMna-Mu0SaTu4xPo9-KQR6GImtj7mX2UwjezKRWg9zCyvfPDSiO4IXZX7CpP3xg"
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "grupo.operativo.84@gmail.com",
      accessToken,
      clientId: "217205102651-2vefguedu5qsou1t1o7h4blr7dotvvoj.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "1//04KMuLu9T8HJHCgYIARAAGAQSNwF-L9Iro8yQqMna-Mu0SaTu4xPo9-KQR6GImtj7mX2UwjezKRWg9zCyvfPDSiO4IXZX7CpP3xg"
    }
  });

  return transporter;
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "No existe un usuario con ese correo electrónico." });
  }

  const token = crypto.randomBytes(20).toString('hex');
  const recoveryToken = new RecoveryToken({ userId: user._id, token });
  await recoveryToken.save();

  const transporter = await createTransporter();

  const resetLink = `http://localhost:5173/recover?userId=${user._id}&token=${token}`;

  await transporter.sendMail({
    to: user.email,
    subject: "Recuperación de Contraseña",
    html: `Por favor, haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${resetLink}">${resetLink}</a>`
  }); 

  res.json({ message: "Se ha enviado un enlace de recuperación de contraseña al correo electrónico proporcionado." });
};

export const resetPassword = async (req, res) => {
  const { userId, token, newPassword } = req.body;

  try {
    const recoveryToken = await RecoveryToken.findOne({ userId, token });

    if (!recoveryToken) {
      return res.status(400).json({ message: "Token de recuperación inválido o ha expirado." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    await recoveryToken.deleteOne();

    res.json({ message: "Contraseña restablecida con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Ocurrió un error al intentar restablecer la contraseña.", error: error.message });
  }
};
