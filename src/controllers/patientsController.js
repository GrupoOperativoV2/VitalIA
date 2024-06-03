import MyPatients from '../models/myPatients.js';

// Controlador para registrar un paciente
export const listPatientsDoctor = async (req, res) => {
  const { doctorID, historyID } = req.body;

  console.log(doctorID, historyID)
  if (!doctorID || !historyID) {
    return res.status(400).json({ message: 'IDdoctor and IDhistory are required' });
  }

  try {
    const existingPatient = await MyPatients.findOne({ doctorID, historyID });
    if (existingPatient) {
      return res.status(400).json({ message: 'This doctor and patient combination already exists' });
    }

    const newPatient = new MyPatients({
      doctorID,
      historyID,
    });

    await newPatient.save();

    res.status(201).json(newPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering patient' });
  }
};


// Controlador para buscar historiales por ID de doctor
export const getHistoriesByDoctorID = async (req, res) => {
    const { doctorID } = req.params;
  
    if (!doctorID) {
      return res.status(400).json({ message: 'IDdoctor is required' });
    }
  
    try {
      // Buscar todos los historiales únicos asociados con el doctorID
      const histories = await MyPatients.find({ doctorID }).distinct('historyID');
  
      res.status(200).json(histories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching patient histories' });
    }
  };