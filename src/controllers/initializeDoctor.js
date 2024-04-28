import Doctor from "../models/medico.model.js";
import bcrypt from "bcryptjs";

const initializeDoctor = async () => {
  try {
    const existingDoctor = await Doctor.findOne({ email: "doctor@example.com" });
    if (!existingDoctor) {
      const password = "password123"; // Contraseña sin cifrar
      const passwordHash = await bcrypt.hash(password, 10); // Encripta la contraseña

      const newDoctor = new Doctor({
        name: "Dr. Example",
        email: "doctor@example.com",
        password: passwordHash, // Guarda la contraseña encriptada
        specialization: "General Medicine", // Especifica la especialización del doctor
        tipo: '2', // Valor que indica que es un tipo doctor
        doctorPhoto: "uplpads\patientPhoto-1713166188529..jpg" // Opcional, ruta a la foto del doctor
      });

      await newDoctor.save();
      console.log("Doctor inicial creado exitosamente.");
    } else {
      console.log("El doctor inicial ya existe en la base de datos.");
    }
  } catch (error) {
    console.error("Error al inicializar el doctor:", error);
  }
};

export default initializeDoctor;
