import Manager from "../models/manager.model";
import bcrypt from "bcryptjs";

const initializeManager = async () => {
  try {
    const existingManager = await Manager.findOne({ username: "admin" });
    if (!existingManager) {
      const password = "123456"; // Contraseña sin cifrar
      const passwordHash = await bcrypt.hash(password, 10); // Encripta la contraseña

      const newManager = new Manager({
        name: "Admin",
        username: "admin",
        email: "admin@example.com",
        password: passwordHash, // Guarda la contraseña encriptada
        tipo: "1", // O el tipo que corresponda para los gestores
      });
      await newManager.save();
      console.log("Gestor inicial creado exitosamente.");
    } else {
      console.log("El gestor inicial ya existe en la base de datos.");
    }
  } catch (error) {
    console.error("Error al inicializar el gestor:", error);
  }
};

export default initializeManager;
