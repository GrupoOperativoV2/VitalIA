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
        specialization: "Medicina Interna", // Especifica la especialización del doctor
        phone: "123-456-7890", // Teléfono del doctor
        address: "123 Main St, City, Country", // Dirección del doctor
        experience: 10, // Años de experiencia
        birthDate: new Date('1970-01-01'), // Fecha de nacimiento
        tipo: '2', // Valor que indica que es un tipo doctor
        doctorPhoto: "uploads/doctorPhoto-1713166188529.jpg" // Ruta a la foto del doctor
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
