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
  function eliminarParteCadena(cadena) {
    // Eliminar "otherAllergies" si está presente
    cadena = cadena.replace("otherAllergies", "");

    // Eliminar "otherFamilyDiseases" si está presente
    cadena = cadena.replace("otherFamilyDiseases", "");

    return cadena;
  }


  function calcularEdad(fechaNacimientoISO) {
    // Convertir la fecha de nacimiento de ISO a un objeto Date
    const fechaNacimiento = new Date(fechaNacimientoISO);

    // Obtener la fecha actual
    const hoy = new Date();

    // Calcular la diferencia de años
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    // Ajustar si la fecha de cumpleaños aún no ha pasado en el año actuals
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }

    return edad;
  }

  function eliminarDespuesNumero(cadena) {
    // Expresión regular para buscar un número seguido de cualquier cosa
    const regex = /\d+(.*)/;

    const match = cadena.match(regex);

    if (match) {
      const indice = match.index;

      return cadena.substring(0, indice + match[0].indexOf(match[1]));
    } else {
      return cadena;
    }
  }
  var hospitav = data.hospitalizations;
  var alergiav = data.allergies;
  var familiav = data.familyHistory;
  var fechaNacimiento = data.date;

  var fecha = calcularEdad(fechaNacimiento);
  var nombre = data.name;
  var genero = data.gender;
  var alergias = eliminarParteCadena(alergiav);;
  var tiposangre = data.bloodType;
  var hospitalizacion = "Hospitalización "  + eliminarDespuesNumero(hospitav);;
  var historialf = eliminarParteCadena(familiav);;
  var notas = data.notes;

  const pythonProcess = spawn(pathToPython, ['client/src/IA/api.py',
    imageFile.path, nombre, genero, alergias, tiposangre, hospitalizacion, historialf, fecha, notas
  ]);

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
    console.log(dataFromPython.trim());
  });
});

export { APIapp };
