import { Router } from "express";
import { createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment, getAllDoctors, getAppointmentsByUserId} from '../controllers/appointment.controller.js';

const router = Router();

// Ruta para obtener todas las citas
router.get('/appointments', getAllAppointments);

// Ruta para obtener una cita específica por ID
router.get('/appointments/:id', getAppointmentById);

// Ruta para crear una nueva cita
router.post('/appointments', createAppointment);

// Ruta para actualizar una cita específica por ID
router.put('/appointments/:id', updateAppointment);

// Ruta para eliminar una cita específica por ID
router.delete('/appointments/:id', deleteAppointment);

router.get('/doctors', getAllDoctors);

router.get('/appointments/user/:id', getAppointmentsByUserId);


export default router;
