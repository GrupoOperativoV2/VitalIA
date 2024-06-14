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

// Lista de orígenes permitidos
const allowedOrigins = [
  'http://159.223.161.190:5173',
  FRONTEND_URL
];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // Verificar si el origen de la solicitud está en la lista de orígenes permitidos
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Static files and routes setupx 
app.get('/hello', (req, res) => {
  res.send('Hola Mundo');
}); 
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
    origin: "http://159.223.161.190:5173",  // Asegúrate de que esto refleje la URL de tu cliente, en desarrollo y producción
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
      socket.emit("user-added", { userId, status: "success" });
    } else {
      socket.emit("user-added", { userId, status: "failed" });
    }
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    } 
    
  });

  socket.on("disconnect", () => {
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
  });
});

export { app, server };
