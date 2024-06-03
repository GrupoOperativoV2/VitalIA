import { Router } from "express";
import {
  getMedicalHistory,
  addMedicalHistory,
  updateMedicalHistory,
  uploadPatientPhoto,
  upload, getMedicalHistoryID
} from '../controllers/medicalHistoryController.js';

const router = Router();

router.get('/user/:userId/medicalHistory', getMedicalHistory);
router.get('/user/:historyID', getMedicalHistoryID);
router.post('/user/:userId/medicalHistory', addMedicalHistory);
router.put('/update/medicalHistory/:historyId', updateMedicalHistory);
router.put('/update/photo/:historyId', upload.single('patientPhoto'), updateMedicalHistory);
router.post('/user/:userId/medicalHistory/photo', upload.single('patientPhoto'), uploadPatientPhoto);

export default router;
