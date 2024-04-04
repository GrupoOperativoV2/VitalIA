import axios from "./axios";

export const AppointmentRequest = async (appointmentData) => {
  return axios.post('/appointments/appointments', appointmentData);
};

export const DoctorSearchRequest = async () => {
  return axios.get('/appointments/doctors');
};

// export const getUserAppointmentsRequest = async (userId) => {
//     return axios.get(`/appointments/appointments/user/${userId}`);
//   };