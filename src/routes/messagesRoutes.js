import { Router } from "express";
import { addMessage, getMessages, getPatientsForDoctor } from "../controllers/messageController.js";

const router = Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);
router.get("/doctor/:doctorId/patients", getPatientsForDoctor);


export default router;
