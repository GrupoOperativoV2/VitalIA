import { Router } from "express";
import{
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from "../controllers/room.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createRoomSchema } from "../schemas/room.schema.js";

const router = Router();

// Crear un nuevo cuarto, con validación de esquema y autenticación
router.post('/rooms', auth, validateSchema(createRoomSchema), createRoom);

// Obtener todos los cuartos, requiere autenticación
router.get('/rooms', auth, getRooms);

// Obtener un cuarto por su ID, requiere autenticación
router.get('/room/:id', auth, getRoomById);

// Actualizar un cuarto por su ID, con validación de esquema y autenticación
router.put('/room/:id', auth, updateRoom);

// Eliminar un cuarto por su ID, requiere autenticación
router.delete('/room/:id', auth, deleteRoom);

export default router;