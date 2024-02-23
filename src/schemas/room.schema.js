import { z } from "zod";

export const roomSchema = z.object({
  number: z.string().nonempty({
    message: "Room number is required",
  }),
  floor: z.number().min(1, {
    message: "Floor must be a number and greater than 0",
  }),
  building: z.string().nonempty({
    message: "Building is required",
  }),
  type: z.enum(["individual", "compartido", "intensivo"]).nonempty({
    message: "Type is required",
  }),
  status: z.enum(["disponible", "ocupado", "mantenimiento"]).nonempty({
    message: "Status is required",
  }),
  capacity: z.number().min(1, {
    message: "Capacity must be at least 1",
  }),
  equipment: z.string().optional(), // Manteniendo como texto libre, separado por comas, y opcional
});
