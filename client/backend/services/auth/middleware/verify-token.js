import { AppError } from "@ayush-kumar-mishra-prog/auth";
import redis from "../redis.js";
import { verifyJwt } from "../utils/jwt.js";

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : req.cookies?.accessToken || req.cookies?.token;

  if (!token) {
    return next(new AppError(401, "Token missing"));
  }
  let decoded;
  try {
    decoded = verifyJwt(token);
  } catch {
    return next(new AppError(401, "Invalid or expired token"));
  }

  if (typeof decoded === "string" || !decoded.userId) {
    return next(new AppError(401, "Invalid token payload"));
  }

  try {
    const [blacklisted, banned] = await Promise.all([
      decoded.jti ? redis.exists(`bl:${decoded.jti}`) : 0,
      redis.exists(`banned:${decoded.userId}`),
    ]);
    if (blacklisted) {
      return next(new AppError(401, "Token blacklisted"));
    }
    if (banned) {
      return next(new AppError(403, "User banned"));
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      jti: decoded.jti,
      exp: decoded.exp,
    };
    return next();
  } catch (error) {
    return next(error);
  }
};

export default verifyToken;
