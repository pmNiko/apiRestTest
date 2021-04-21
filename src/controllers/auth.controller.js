/*
  Controller de autenticacion
*/

import User from "../models/User";
import Role from "../models/Role";
import * as token from "../libs/token";

// fn de registro de user
export const signup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    const user = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    // comprobación de roles
    if (roles) {
      // si nos envian roles find => [{}]  findOne => {}
      const foundRoles = await Role.find({ name: { $in: roles } });
      if (foundRoles <= 0)
        return res.status(422).json({ message: "Roles not found" });
      user.roles = foundRoles.map((role) => role._id);
    } else {
      // asignación de rol por defecto
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
    }

    const saveUser = await user.save();

    // creación del token: data - secret - expiresIn
    const tokenJwt = token.sign({ id: saveUser._id });

    res.status(201).json({ tokenJwt });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "user already exists" });
  }
};

// fn de login de user
export const signin = async (req, res) => {
  const userFound = await User.findOne({
    email: req.body.email,
  }).populate("roles", { _id: 0 });

  if (!userFound) return res.status(404).json({ message: "User not found" });

  // validación de password
  const matchPassword = await User.comparePassword(
    req.body.password, //string
    userFound.password //hash
  );

  if (!matchPassword)
    return res.status(401).json({ message: "Invalid password" });

  // creación del token: data - secret - expiresIn
  const tokenJwt = token.sign({ id: userFound._id });

  res.json({ tokenJwt });
};
