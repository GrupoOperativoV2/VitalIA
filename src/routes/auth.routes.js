import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
  registerDoctor, 
  getMedicalHistoryPhoto,requestPasswordReset, resetPassword, upload
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema, registerDoctorSchema } from "../schemas/auth.schema.js"; 



const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post('/registerDoctor', upload.single('doctorPhoto'), registerDoctor);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);

router.get('/photoUser/:userId', getMedicalHistoryPhoto);

router.post("/request-password-reset", requestPasswordReset);
router.post("/password-reset", resetPassword);

export default router;
