const PORT = process.env.PORT || 4000;

export const API_URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}/api`;
