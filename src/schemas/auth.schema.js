import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
    birthDate: z
    .string({ 
      required_error: "Birthdate is required",
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Birthdate must be in YYYY-MM-DD format",
    }),
});

export const registerDoctorSchema = z.object({
  name: z.string({
    required_error: "El nombre completo es obligatorio",
  }),
  email: z
    .string({
      required_error: "El email es obligatorio",
    })
    .email({
      message: "El email no es válido",
    }),
  specialization: z.string({
    required_error: "La especialización es obligatoria",
  }),
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
