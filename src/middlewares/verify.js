/*
  comprobación de user y rol existente
*/
import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkRoles = (req, res, next) => {
  const roles = req.body.roles;

  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        return res
          .status(403)
          .json({ message: `Role ${roles[i]} does not exists.` });
      }
    }
  }

  next();
};

export const duplicate = async (req, res, next) => {
  const { username, email } = req.body;

  const user = await User.findOne({ username: username });

  if (user)
    return res
      .status(400)
      .json({ message: `username ${username} already exists.` });

  const emailUser = await User.findOne({ email: email });

  if (emailUser)
    return res.status(400).json({ message: "email already exists" });

  next();
};
