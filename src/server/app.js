import express from "express";
import morgan from "morgan";
import pkg from "../../package.json";
import productsRoutes from "../routes/products.routes";
import authRoutes from "../routes/auth.routes";
import usersRoutes from "../routes/users.routes";
import { connect } from "./database";
import { createRoles } from "../libs/initialSetup";

const app = express();

app.use(express.json());

connect();
createRoles(); //setup roles

app.use(morgan("dev"));

// seteamos un par clave valor al server
app.set("pkg", pkg);

app.get("/", (req, res) => {
  const { name, author, description, version } = app.get("pkg");
  res.json({
    name,
    author,
    description,
    version,
  });
});

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

export default app;
