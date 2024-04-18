import React, { createContext, useState, useContext, useCallback } from 'react';
import { getUserAppointmentsRequest } from '../api/appointments'; 

// Crear el contexto
const AppointmentContext = createContext();

// Proveedor del contexto
export const AppointmentsProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Método para cargar las citas de un usuario específico
    const loadUserAppointments = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        try {   
            const response = await getUserAppointmentsRequest(userId);
            setAppointments(response.data); // Asegúrate de ajustar esto dependiendo de cómo tu backend envía los datos
        } catch (err) {
            setError(err.message);
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Exponer los estados y funciones a través del proveedor
    return (
        <AppointmentContext.Provider value={{ appointments, loading, error, loadUserAppointments }}>
            {children}
        </AppointmentContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAppointments = () => {
    const context = useContext(AppointmentContext);
    if (context === undefined) {
        throw new Error('useAppointments must be used within a AppointmentsProvider');
    }
    return context;
};
