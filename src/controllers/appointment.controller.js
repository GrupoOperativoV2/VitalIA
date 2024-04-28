import appointment from '../models/appointment.model.js';
import Doctor from '../models/medico.model.js';


export const createAppointment = async (req, res) => {
  try {
    const newAppointment = new appointment({
      patientId: req.body.patientId,
      doctorId: req.body.doctorId,
      symptoms: req.body.symptoms, // Adding symptoms from request body
      reason: req.body.reason, // Adding reason from request body
      date: req.body.date,
      time: req.body.time,
      status: req.body.status
    });

    const savedAppointment = await newAppointment.save();
    
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error al crear la cita:', error); // Improved error logging
    res.status(400).json({ message: error.message });
  }
};

  

// Leer todas las citas
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getAppointmentsByUserId = async (req, res) => {
    try {
      const userId = req.params.id; // Asumiendo que el ID del usuario se pasa como parámetro en la URL
      const userAppointments = await appointment.find({ patientId: userId });
  
      if (userAppointments.length > 0) {
        res.json(userAppointments);
      } else {
        res.status(404).json({ message: 'No appointments found for this user' });
      }
    } catch (error) {
      console.error('Error al obtener las citas por ID de usuario:', error);
      res.status(500).json({ message: error.message });
    }
  };
  

// Actualizar una cita por ID
export const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // Retorna el documento modificado
    );
    if (updatedAppointment) {
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una cita por ID
export const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await appointment.findByIdAndDelete(req.params.id);
    if (deletedAppointment) {
      res.json({ message: 'Appointment deleted' });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
