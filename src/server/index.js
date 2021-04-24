import dotenv from 'dotenv';
import app from './app';
// recuperación de datos
const { parsed } = dotenv.config();
const { SERVER_PORT } = parsed;

// server escuchando en el port 4000
app.listen(SERVER_PORT);

console.log('Server corriendo en el port: ', SERVER_PORT);
