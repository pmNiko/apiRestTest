import dotenv from "dotenv";
import app from "./app";
import { connect } from "./database";
import { createRoles } from "../libs/initialSetup";

createRoles(); //setup roles
// recuperación de datos
const { parsed } = dotenv.config();
const { SERVER_PORT } = parsed;

// connect database
connect();

// server escuchando en el port 4000
const server = app.listen(SERVER_PORT);

console.log("Server corriendo en el port: ", SERVER_PORT);

export { app, server };
