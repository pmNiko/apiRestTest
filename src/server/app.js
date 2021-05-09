import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import pkg from "../../package.json";
import productsRoutes from "../routes/products.routes";
import authRoutes from "../routes/auth.routes";
import usersRoutes from "../routes/users.routes";
import rolesRoutes from "../routes/roles.routes";

const app = express();

//para solicitud de obj entrantes a partir de un form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

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
app.use("/api/roles", rolesRoutes);

export default app;
