import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
  registerDoctor, 
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema, registerDoctorSchema } from "../schemas/auth.schema.js"; 



const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/registerDoctor", validateSchema(registerDoctorSchema), registerDoctor); // Nueva ruta para el registro de doctores.
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);


export default router;
