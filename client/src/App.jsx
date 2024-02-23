import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";  
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import {RoomFormPage} from "./pages/RoomFormPage";
import { RoomPage } from "./pages/RoomsPage"; // Importando la página de Rooms
import { RoomProvider } from "./context/roomsContext"; // Importando el proveedor de contexto para Rooms

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <RoomProvider> {/* Agregando el RoomProvider en el árbol de componentes */}
          <BrowserRouter>
            <main className="container content-container mx-auto px-10 md:px-0">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                  {/* Rutas existentes */}
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<h1>Profile</h1>} />
                  {/* Nuevas rutas para Rooms */}
                  <Route path="/rooms" element={<RoomPage />} />
                  <Route path="/add-room" element={<RoomFormPage />} />
                  {/* Si tienes más páginas relacionadas con Rooms, pueden ir aquí */}
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </RoomProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
