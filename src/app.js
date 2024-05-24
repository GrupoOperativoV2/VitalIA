// Backend Configuration (e.g., server.js or app.js)
import express from "express";
import { createServer } from 'http';
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import initializeDoctor from "../src/controllers/initializeDoctor.js";
import initializeManager from "../src/controllers/initializeManager.js";
import authRoutes from "./routes/auth.routes.js";
import medicalHistoryRoutes from './routes/medicalHistoryRoutes.js';  
import appointmentRoutes from './routes/appointment.routes.js';
import messageRoutes from './routes/messagesRoutes.js';
import { FRONTEND_URL } from "./config.js";

const app = express();
app.set('trust proxy', 1);
const server = createServer(app);  // Create an HTTP server for Express and Socket.io

// //Agregamo un manager por defecto 
initializeManager();
initializeDoctor();

// Middleware setup
app.use(cors({
  credentials: true,
  origin: [FRONTEND_URL, 'http://localhost:3000'] // Incluye todas las URLs relevantes
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Static files and routes setup
app.use('/uploads', express.static('uploads'));
app.use("/api/messages", messageRoutes);
app.use("/api/medicalHistory", medicalHistoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// Production-specific setup
if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static(path.resolve("client", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

const io = new SocketIOServer(server, {
  cors: {
    origin: FRONTEND_URL,  // Asegúrate de que esto refleje la URL de tu cliente, en desarrollo y producción
    methods: ["GET", "POST"],  // Especifica los métodos permitidos si es necesario
    credentials: true
  }
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    if (userId) {
      onlineUsers.set(userId, socket.id);
      // Enviar confirmación al cliente
      socket.emit("user-added", { userId, status: "success" });
    } else {
      // Enviar una respuesta de fallo si el userId no se proporcionó o es inválido
      socket.emit("user-added", { userId, status: "failed" });
    }
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });

  // Manejador para cuando un cliente se desconecta
  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
        console.log(`Usuario ${key} eliminado de onlineUsers`);
      }
    });
  });
});

export { app, server };
