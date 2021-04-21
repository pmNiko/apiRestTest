/*
  fn para generar y verificar la firma del token
*/
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const key = fs.readFileSync(path.join(__dirname, "../keys/private.pem"));
const certificate = fs.readFileSync(path.join(__dirname, "../keys/public.pem"));
const options = { expiresIn: "6h", algorithm: "RS256" };

// create token with private key
export const sign = (payload) => jwt.sign(payload, key, options);

// verify token with public key
export const verify = (token) => jwt.verify(token, certificate);
