/*
  Modelo de usuarios
*/

import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Encriptación del password
userSchema.statics.encryptPassword = async (password) => {
  // genSalt() es un algoritmo aplicado la cantidad der veces que le definamos
  const salt = await bcrypt.genSalt(10);
  // hash toma como params el password y el salt
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// Comparación de password
// primer param: string
// segundo param: hash
userSchema.statics.comparePassword = async (passwordBody, passwordDB) => {
  // retornar true si las contraseñas coinciden
  return await bcrypt.compare(passwordBody, passwordDB);
};

export default model("User", userSchema);
