/*
  Validacion del token
*/
import * as token from "../libs/token";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  const tokenJwt = req.headers["x-access-token"];

  if (!tokenJwt) return res.status(403).json({ message: "No token provided." });

  try {
    // verify token
    const decoded = token.verify(tokenJwt);
    req.userId = decoded.id; // la vamos a utilizar en los siguientes middle

    const user = await User.findById(req.userId, { password: 0 }); //password: 0 para que no lo devuelva

    if (!user) return res.status(404).json({ message: "no user found" });

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Unauthorized" });
  }
};

// verifica que el rol sea admin
export const isAdmin = async (req, res, next) =>
  await verifyRole("admin", req, res, next);

// verifica que el rol sea moderator
export const isModerator = async (req, res, next) =>
  await verifyRole("moderator", req, res, next);

// fn modular para validar rol
async function verifyRole(role, req, res, next) {
  if (!req.userId)
    return res.status(422).json({ message: "Role does not exists" });

  const user = await User.findById(req.userId);

  // verificar el rol del user find busca por _id  todos los objetos que incluyan estos ids => [{_id, name:"nameRol"}]
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === role) {
      next();
      return;
    }
  }

  res.status(403).json({ message: `Role ${role} is required.` });
}
