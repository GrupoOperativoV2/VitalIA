  import MedicalHistory from '../models/medicalHistory.model.js';
  import multer from 'multer';
  import path from 'path';


  //Multer
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  });

  export const upload = multer({ storage: storage });



  // export const getMedicalHistory = async (req, res) => {
  //   try {
  //     const { userId } = req.params;
  //     const history = await MedicalHistory.findOne({ userId });
  //     res.status(200).json(history);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };

  export const getMedicalHistory = async (req, res) => {
    try {
      const { userId } = req.params;

      const history = await MedicalHistory.findOne({ userId });

      if (history) {
        res.status(200).json(history);
      } else {
        res.status(404).json({ message: 'Historial médico no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el historial médico', error });
    }
  };



    export const getMedicalHistoryID = async (req, res) => {
      try {
        const { historyID } = req.params;

        const history = await MedicalHistory.findById(historyID);

        if (history) {
          res.status(200).json(history);
        } else {
          res.status(404).json({ message: 'Historial médico no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener el historial médico', error });
      }
    };

  export const uploadPatientPhoto = async (req, res) => {
    const { userId } = req.params;
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const imagePath = req.file.path;
    try {
        // Actualiza la historia médica del usuario con la ruta del archivo de la foto
        const history = await MedicalHistory.findOneAndUpdate(
            { userId }, 
            { patientPhoto: imagePath }, 
            { new: true }
        );

        res.status(200).json({ message: "Image uploaded successfully", data: history });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };


  export const addMedicalHistory = async (req, res) => {
      try {
        console.log("Datos recibidos en addMedicalHistory:", req.body); // Verificar datos del body
          const { userId } = req.params;
          const data = req.body;

          if (Object.keys(data).length === 0) {
              return res.status(400).json({ message: "No data sent" });
          }

          const newHistory = new MedicalHistory({ ...data, userId });
          const savedHistory = await newHistory.save();
          res.status(201).json(savedHistory);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };

  export const updateMedicalHistory = async (req, res) => {
    try {
      const { historyId } = req.params;
      const data = req.body;

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'No data provided' });
      }

      if (req.file) {
        data.patientPhoto = req.file.path.replace(/\\/g, '/');
      }

      const updatedHistory = await MedicalHistory.findByIdAndUpdate(
        historyId,
        { $set: data }, // Utiliza $set para actualizar solo los campos proporcionados
        { new: true, runValidators: true } // new: true devuelve el documento actualizado, runValidators: true asegura que las validaciones del esquema se ejecuten
      );

      if (!updatedHistory) {
        return res.status(404).json({ message: 'Medical history not found' });
      }

      res.status(200).json(updatedHistory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };