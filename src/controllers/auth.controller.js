import User from "../models/user.model.js";
import Doctor from "../models/medico.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import { registerSchema, registerDoctorSchema} from "../schemas/auth.schema.js";

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

export const registerDoctor = async (req, res) => {
  try {
    const { name, email, specialization, password, birthDate } = req.body;

    const parsedData = registerDoctorSchema.safeParse({ name, email, specialization, password, birthDate});
    if (!parsedData.success) {
      return res.status(400).json({
        message: parsedData.error.issues.map(issue => issue.message),
      });
    }

    const userFound = await Doctor.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // Se hashea el password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = new Doctor({
      name,
      email,
      specialization,
      password: passwordHash,
      birthDate,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id,
      name: userSaved.name,
      tipo: userSaved.tipo,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
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
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    return res.json({
      id: userFound._id,
      username: userFound.username || userFound.name, 
      email: userFound.email,
      name: userFound.name,
      tipo: userFound.tipo,
      birthDate: userFound.birthDate
  });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    let userFound = await User.findById(user.id);

    if (!userFound) {
      userFound = await Doctor.findById(user.id);

      if (!userFound) return res.sendStatus(401);
    }

    return res.json({
      id: userFound._id,
      username: userFound.username || userFound.name,
      email: userFound.email,
      name: userFound.name,
      tipo: userFound.tipo,
      birthDate: userFound.birthDate
  });
  
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
