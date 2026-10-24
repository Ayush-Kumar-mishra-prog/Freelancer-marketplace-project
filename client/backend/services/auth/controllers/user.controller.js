import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { AppError } from "@ayush-kumar-mishra-prog/auth";
import mongoose from "mongoose";
import redis from "../redis.js";
import { signJwt } from "../utils/jwt.js";

const ACCESS_TTL = 15 * 60;
const REFRESH_TTL = 7 * 24 * 60 * 60;
const USER_CACHE_TTL = 15 * 60;
const PUBLIC_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

const issueTokens = async (user) => {
  const accessToken = signJwt(
    {
      userId: user._id.toString(),
      role: user.role,
      jti: uuid(),
    },
    ACCESS_TTL,
  );
  const refreshToken = uuid();
  await redis.set(
    `refresh:${refreshToken}`,
    user._id.toString(),
    "EX",
    REFRESH_TTL,
  );
  return { accessToken, refreshToken };
};

const sendTokens = (res, tokens) => {
  res.cookie("accessToken", tokens.accessToken, {
    ...PUBLIC_COOKIE_OPTIONS,
    maxAge: ACCESS_TTL * 1000,
  });
  res.cookie("refreshToken", tokens.refreshToken, {
    ...PUBLIC_COOKIE_OPTIONS,
    maxAge: REFRESH_TTL * 1000,
  });
};

const publicUser = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  full_name: user.full_name,
  role: user.role,
  status: user.status,
});

export const register = async (req, res, next) => {
  const { username, email, password, full_name, role, status } = req.body || {};
  try {
    if (!username || !email || !password || !full_name) {
      throw new AppError(400, "All fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError(400, "This email is already registered");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      full_name,
      role,
      status,
    });
    await newUser.save();
    const tokens = await issueTokens(newUser);
    sendTokens(res, tokens);
    res.status(201).json({
      message: "User registered successfully",
      user: publicUser(newUser),
      token: tokens,
      ...tokens,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password, role } = req.body || {};
  try {
    if (!email || !password) {
      throw new AppError(400, "Email and password are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(404, "Email is not registered");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, "Invalid password");
    }
    if (user.status !== "active") {
      throw new AppError(403, "Your account is not active");
    }
    if (role && user.role !== role) {
      throw new AppError(403, "You are not authorized to login as this role");
    }

    const tokens = await issueTokens(user);
    sendTokens(res, tokens);
    res.status(200).json({
      message: "Login successful",
      user: publicUser(user),
      token: tokens,
      ...tokens,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError(401, "Not authenticated");
    }

    const cacheKey = `user:${userId}`;
    const cachedUser = await redis.get(cacheKey);
    if (cachedUser) {
      return res.status(200).json({ user: JSON.parse(cachedUser) });
    }

    const user = await User.findById(userId).select("-password").lean();
    if (!user) {
      throw new AppError(404, "User not found");
    }
    await redis.set(cacheKey, JSON.stringify(user), "EX", USER_CACHE_TTL);
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new AppError(400, "Refresh token is required");
    }

    const refreshKey = `refresh:${refreshToken}`;
    const userId = await redis.get(refreshKey);
    if (!userId) {
      throw new AppError(401, "Invalid refresh token");
    }

    const user = await User.findById(userId);
    if (!user || user.status !== "active") {
      await redis.del(refreshKey);
      throw new AppError(401, "User not found or inactive");
    }

    const tokens = await issueTokens(user);
    await redis.del(refreshKey);
    sendTokens(res, tokens);
    return res
      .status(200)
      .json({ message: "Token refreshed", token: tokens, ...tokens });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { jti, exp } = req.user || {};
    if (jti && exp) {
      const ttl = exp - Math.floor(Date.now() / 1000);
      if (ttl > 0) {
        await redis.set(`bl:${jti}`, "1", "EX", ttl);
      }
    }

    const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;
    if (refreshToken) {
      await redis.del(`refresh:${refreshToken}`);
    }
    res.clearCookie("accessToken", PUBLIC_COOKIE_OPTIONS);
    res.clearCookie("refreshToken", PUBLIC_COOKIE_OPTIONS);
    res.clearCookie("token", PUBLIC_COOKIE_OPTIONS);
    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

export const banUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!mongoose.isValidObjectId(userId)) {
      throw new AppError(400, "Invalid user ID");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    user.status = "block";
    await user.save();
    await redis.set(`banned:${userId}`, "1");
    await redis.del(`user:${userId}`);
    return res.status(200).json({ message: "User banned" });
  } catch (error) {
    next(error);
  }
};
