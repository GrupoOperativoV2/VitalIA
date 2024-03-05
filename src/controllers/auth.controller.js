import User from "../models/user.model.js";
import Doctor from "../models/medico.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import { registerSchema, registerDoctorSchema} from "../schemas/auth.schema.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, birthDate } = req.body;

    const parsedData = registerSchema.safeParse({ username, email, password, birthDate });
    if (!parsedData.success) {
      return res.status(400).json({
        message: parsedData.error.issues.map(issue => issue.message),
      });
    }

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // Se hashea el password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      birthDate,
    });

    // Guarda el usuario en la BD
    const userSaved = await newUser.save();

    // Genera un token de acceso definiendo qué datos podrán ser visualizados en Cookies
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

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
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

    // Intenta encontrar el email en la colección User
    let userFound = await User.findOne({ email });

    // Si no se encuentra en User, busca en la colección Doctor
    if (!userFound) {
      userFound = await Doctor.findOne({ email });

      // Si tampoco se encuentra en Doctor, retorna error
      if (!userFound)
        return res.status(400).json({
          message: ["The email does not exist"],
        });
    }

    // Compara la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    // Genera el token de acceso con la información del usuario o doctor encontrado
    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username || userFound.name, // Asume que Doctor puede no tener 'username' pero sí 'name'
      tipo: userFound.tipo,
    });

    // Configura la cookie con el token
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    // Retorna la respuesta con la información del usuario o doctor
    res.json({
      id: userFound._id,
      username: userFound.username || userFound.name, // Asume que Doctor puede no tener 'username' pero sí 'name'
      email: userFound.email,
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

    // Intenta encontrar el usuario por ID en la colección User
    let userFound = await User.findById(user.id);

    // Si no se encuentra en User, busca en la colección Doctor
    if (!userFound) {
      userFound = await Doctor.findById(user.id);

      // Si tampoco se encuentra en Doctor, retorna error
      if (!userFound) return res.sendStatus(401);
    }

    // Devuelve la información del usuario o doctor encontrado
    return res.json({
      id: userFound._id,
      username: userFound.username || userFound.name, // Asume que Doctor puede no tener 'username' pero sí 'name'
      email: userFound.email,
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
