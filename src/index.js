import { app, server } from './app.js'; 
import { PORT } from './config.js';
import { APIapp } from '../client/src/IA/DataReceiver.js'; 
import { connectDB } from './db.js';

async function main() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
    APIapp.listen(5000, () => {
      console.log('API app listening on port 5000!');
    });
  } catch (error) {
    console.error(error);
  }
}

main();
