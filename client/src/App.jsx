import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
import { PatientPages } from "./routes";
import { DoctorPages } from "./routes";
import { ManagerPages } from "./routes";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import React, { useState } from "react";
export const ThemeContext = React.createContext(null);

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";


import { LoginPage } from "./pages/LoginPage";

import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { RoomFormPage } from "./pages/RoomFormPage";
import { RoomPage } from "./pages/RoomsPage"; // Importando la página de Rooms
import { RoomProvider } from "./context/roomsContext"; // Importando el proveedor de contexto para Rooms
import { GestorH } from "./pages/GestorH";

//Paciente
import { PatientPage } from "./pages/Patient/PatientPage";
import { ProfilePage } from './pages/Patient/ProfilePage';
import { MonitoringPage } from './pages/Patient/MonitoringPage';
import { MessagesPage } from './pages/Patient/MessagesPage';
import { SettingPage } from './pages/Patient/SettingPage';

//Doctor
import { DoctorPage } from "./pages/Doctor/DoctorPage";
import { ProfilePageD } from "./pages/Doctor/ProfilePageD";
import { AssistantPage } from "./pages/Doctor/AssistantPage";
import { MessagesPageD } from "./pages/Doctor/MessagesPageD";
import { SettingPageD } from "./pages/Doctor/SettingPageD";

//Gestor
import { GestorPage } from "./pages/Manager/GestorPage";
import { ManagementPage } from "./pages/Manager/ManagementPage";
import { PersonalPage } from "./pages/Manager/PersonalPage";
import { SearchPage } from "./pages/Manager/SearchPage";
import { SettingPageM } from "./pages/Manager/SettingPageM";


function App() {

  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <AuthProvider>
      <TaskProvider>
        <RoomProvider>
          {" "}
          {/* Agregando el RoomProvider en el árbol de componentes */}
          <BrowserRouter>
            <ThemeContext.Provider value={{ setTheme, theme }}>
              <ThemeProvider theme={themeStyle}>
                <main className="container content-container mx-auto px-10 md:px-0">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<ProtectedRoute />}>
                      {/*
                  Después de agregar los módulos faltantes, deberán ser 
                  agregados dentro del elemento de cada tipo de usuario.
                  Para definir a qué ruta deberá ser referenciado el usuario 
                  como su principal, se deberá consultar ./routes y realizar los
                  cambios indicados
                  */}

                      <Route element={<ManagerPages />}>
                      <Route path="/gestor" element={<GestorPage />} />
                      <Route path="/management" element={<ManagementPage />} />
                      <Route path="/personal" element={<PersonalPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/settingM" element={<SettingPageM />} />


                        {/* <Route path="/tasks" element={<TasksPage />} />
                        <Route path="/add-task" element={<TaskFormPage />} />
                        <Route path="/tasks/:id" element={<TaskFormPage />} />
                        <Route path="/profile" element={<h1>Profile</h1>} /> */}
                        {/* Nuevas rutas para Rooms */}
                        {/* <Route path="/rooms" element={<RoomPage />} />
                        <Route path="/add-room" element={<RoomFormPage />} />
                        <Route path="/gestor" element={<GestorPage />} />
                        <Route path="/gestionH" element={<GestorH />} /> */}
                        {/* Si tienes más páginas relacionadas con Rooms, pueden ir aquí */}

                      </Route>

                      <Route element={<DoctorPages />}>
                        <Route path="/doctor" element={<DoctorPage />} />
                        <Route path="/profiledoctor" element={<ProfilePageD />} />
                        <Route path="/assistant" element={<AssistantPage />} />
                        <Route path="/messagesdoctor" element={<MessagesPageD />} />
                        <Route path="/settingdoctor" element={<SettingPageD />} />
                      </Route>

                      <Route element={<PatientPages />}>
                        <Route path="/pacient" element={<PatientPage />} />
                        <Route path="/profilepatient" element={<ProfilePage />} />
                        <Route path="/monitoring" element={<MonitoringPage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/setting" element={<SettingPage />} />
                      </Route>
                    </Route>
                  </Routes>
                </main>
              </ThemeProvider>
            </ThemeContext.Provider>
          </BrowserRouter>
        </RoomProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
