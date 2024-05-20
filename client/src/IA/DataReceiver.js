import express from 'express';
import multer from 'multer';
import { spawn } from 'child_process';
import cors from 'cors';  // Importa el paquete cors
const pathToPython = './.venv/Scripts/python.exe'; 

const APIapp = express();

const upload = multer({ dest: 'uploads/' });

APIapp.use(cors());

APIapp.use(express.json());

APIapp.post('/upload', upload.single('image'), (req, res) => {
  const data = req.body;
  const imageFile = req.file;

  console.log('Datos recibidos en DataReceiver5000.js:', data);
  console.log('Imagen recibida en DataReceiver5000.js:', imageFile);

  const pythonProcess = spawn(pathToPython, ['client/src/IA/api.py', imageFile.path]);

  let dataFromPython = '';

  pythonProcess.stdout.on('data', (data) => {
    dataFromPython += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    res.send(dataFromPython.trim());
    console.log(dataFromPython.trim());iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii5ñ,ññ444x
  });
});

export { APIapp };
