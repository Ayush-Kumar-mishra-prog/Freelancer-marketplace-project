import { v4 as uuid } from "uuid";
import { signJwt } from "./jwt.js";

export const generateToken = (user) =>
  signJwt(
    { userId: user._id.toString(), role: user.role, jti: uuid() },
    "1h",
  );