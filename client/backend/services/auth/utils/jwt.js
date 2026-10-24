import { readFileSync } from "node:fs";
import jwt from "jsonwebtoken";

const privateKey = readFileSync(new URL("../private.pem", import.meta.url), "utf8");
const publicKey = readFileSync(new URL("../public.pem", import.meta.url), "utf8");

export const signJwt = (payload, expiresIn = "1h") =>
  jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn });

export const verifyJwt = (token) =>
  jwt.verify(token, publicKey, { algorithms: ["RS256"] });
