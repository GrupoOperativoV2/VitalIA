import { Router } from "express";
import {
  getMedicalHistory,
  addMedicalHistory,
  updateMedicalHistory,
  uploadPatientPhoto,
  upload
} from '../controllers/medicalHistoryController.js';

const router = Router();

router.get('/user/:userId/medicalHistory', getMedicalHistory);
router.post('/user/:userId/medicalHistory', addMedicalHistory);
router.put('/user/:userId/medicalHistory/:historyId', updateMedicalHistory);
router.post('/user/:userId/medicalHistory/photo', upload.single('patientPhoto'), uploadPatientPhoto);

export default router;
