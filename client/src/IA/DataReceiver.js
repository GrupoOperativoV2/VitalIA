import express from 'express';
import multer from 'multer';
import { spawn } from 'child_process';
import cors from 'cors';  // Importa el paquete cors

const app = express();
const port = 5000;

// Configurar multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

// Habilitar CORS para todas las solicitudes
app.use(cors());

app.use(express.json());

app.post('/upload', upload.single('image'), (req, res) => {
  const data = req.body;
  const imageFile = req.file;

  console.log('Datos recibidos en DataReceiver5000.js:', data);
  console.log('Imagen recibida en DataReceiver5000.js:', imageFile);

  const pythonProcess = spawn('python', ['api.py', imageFile.path]); // Asegúrate de usar el comando correcto

  let dataFromPython = '';

  pythonProcess.stdout.on('data', (data) => {
    dataFromPython += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    res.send(dataFromPython);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
