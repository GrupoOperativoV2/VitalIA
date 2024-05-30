const PORT = 4000;

let API_URL;

if (process.env.NODE_ENV === 'production') {
  API_URL = `https://vital-ia-c973e2aac327.herokuapp.com/api`;
} else {
  API_URL = `http://localhost:${PORT}/api`;
}

export { API_URL };
