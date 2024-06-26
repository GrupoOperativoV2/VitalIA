import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { GlobalStateProvider } from "./context/GlobalState";
import { AppointmentsProvider } from "./context/appointmentContext";
import { ProtectedRoute } from "./routes";
import { PatientPages } from "./routes";
import { DoctorPages } from "./routes";
import { ManagerPages } from "./routes";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import React, { useState, useEffect } from "react";
export const ThemeContext = React.createContext(null);

import HomePage from "./pages/HomePage";
import { SesionPage } from "./pages/SesionPage";
import { Recover } from "./pages/Recover";

// Paciente
import { PatientPage } from "./pages/Patient/PatientPage";
import { ProfilePage } from "./pages/Patient/ProfilePage";
import { MonitoringPage } from "./pages/Patient/MonitoringPage";
import { MessagesPage } from "./pages/Patient/MessagesPage";
import { SettingPage } from "./pages/Patient/SettingPage";

// Doctor
import { DoctorPage } from "./pages/Doctor/DoctorPage";
import { ProfilePageD } from "./pages/Doctor/ProfilePageD";
import { AssistantPage } from "./pages/Doctor/AssistantPage";
import { MessagesPageD } from "./pages/Doctor/MessagesPageD";
import { SettingPageD } from "./pages/Doctor/SettingPageD";

// Gestor
import { GestorPage } from "./pages/Manager/GestorPage";
import { ManagementPage } from "./pages/Manager/ManagementPage";
import { PersonalPage } from "./pages/Manager/PersonalPage";
import { SearchPage } from "./pages/Manager/SearchPage";
import { SettingPageM } from "./pages/Manager/SettingPageM";

import { PreviewProfile } from "./pages/Doctor/components/PreviewProfile";

import { Page404 } from "./pages/Page404";

import  Expobatiz  from "./pages/Expobatiz";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeContext.Provider value={{ setTheme, theme }}>
          <AppointmentsProvider>
            <GlobalStateProvider>
              <ThemeProvider theme={themeStyle}>
                <main className="container content-container mx-auto px-10 md:px-0">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<SesionPage />} />
                    <Route path="/register" element={<SesionPage />} />
                    <Route path="/recover" element={<Recover />} />
                    <Route path="/expo" element={<Expobatiz />} />
                    <Route element={<ProtectedRoute />}>
                      <Route element={<ManagerPages />}>
                        <Route path="/gestor" element={<GestorPage />} />
                        <Route path="/management" element={<ManagementPage />} />
                        <Route path="/personal" element={<PersonalPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/settingM" element={<SettingPageM />} />
                      </Route>
                      <Route element={<DoctorPages />}>
                        <Route path="/doctor" element={<DoctorPage />} />
                        <Route path="/profiledoctor" element={<ProfilePageD />} />
                        <Route path="/assistant" element={<AssistantPage />} />
                        <Route path="/messagesdoctor" element={<MessagesPageD />} />
                        <Route path="/settingdoctor" element={<SettingPageD />} />
                        <Route path="/previewpatient" element={<PreviewProfile />} />
                      </Route>
                      <Route element={<PatientPages />}>
                        <Route path="/pacient" element={<PatientPage />} />
                        <Route path="/profilepatient" element={<ProfilePage />} />
                        <Route path="/monitoring" element={<MonitoringPage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/setting" element={<SettingPage />} />
                      </Route>
                    </Route>
                    <Route path="*" element={<Page404 />} />
                  </Routes>
                </main>
              </ThemeProvider>
            </GlobalStateProvider>
          </AppointmentsProvider>
        </ThemeContext.Provider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
