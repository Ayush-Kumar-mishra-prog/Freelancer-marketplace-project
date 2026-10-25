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
    console.log(error)
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


export const createModerator = async(req,res,next)=>{
   try {
    const {username,full_name,email,password,isFullTime,status,role} = req.body;
    const exist = await User.findOne({email})
    if(exist){
      throw new AppError(400, "This email is already registered");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newEmployee = new User({
      full_name,
      username,
      email,
      password: hashedPassword,
      role,
      status,
      isFullTime
    });
    await newEmployee.save();
    return res.status(201).json({
      message: "Employee created successfully",
      employee: publicUser(newEmployee),
    });
   } catch (error) {
    console.log(error)
    next(error);
   }
}


export const getAllModerator = async(req,res,next)=>{
  try {
    const page = Math.max(0, Number.parseInt(req.query.page, 10) || 0);
    const pageSize = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.pageSize, 10) || 10),
    );
    const search =
      typeof req.query.search === "string" ? req.query.search.trim() : "";
    const filter = { role: "moderator" };

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchPattern = new RegExp(escapedSearch, "i");
      filter.$or = [
        { full_name: searchPattern },
        { username: searchPattern },
        { email: searchPattern },
      ];
    }

    const [users, itemCount] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(page * pageSize)
        .limit(pageSize),
      User.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: users,
      itemCount,
    });

  } catch (error) {
    console.log(error)
    next(error)
  }
}


export const getSingleModerator = async(req,res,next) =>{
  try {
    const {id} = req.params;
    const moderator =await User.findOne({
      _id:id,
      role:"moderator"
    }).select("-password")
    if(!moderator){
      return res.status(404).json({message:"Moderator not found"})
    }
    return res.status(200).json({
      success:true,
      data:moderator
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const deleteModerator = async(req,res,next)=>{
  try {
    const {id} = req.body;
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(400, "Invalid moderator ID");
    }
    const moderator = await User.findOneAndDelete({
      _id:id,
      role:"moderator"
    })
    if(!moderator){
      return res.status(404).json({message:"Moderator not found"})
    }
    return res.status(200).json({message:"Moderator deleted successfully"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}


export const updateModerator = async(req,res,next)=>{
  try {
    const {id} = req.params
    if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({message:"Not a valid id"})
    }

    const allowedFields = [
      "username",
      "full_name",
      "status",
      "isFullTime"
    ];
    const updates = {};
    for (const field of allowedFields){
      if(req.body[field] !== undefined){
        updates[field] = req.body[field];
      }
    }

    if(Object.keys(updates).length === 0){
      return res.status(400).json({
        success:false,
        message:"No valid fields provided for update"
      })
    }
    const moderator = await User.findOneAndUpdate({
      _id:id,
      role:"moderator"
    },
    {
      $set:updates
    },
    {
      new:true,
      runValidators:true
    }
  ).select("-password -refreshToken")
  if(!moderator){
    return res.status(404).json({
      success:false,
      message:"Moderator not found"
    })
  }
  return res.status(200).json({
    success:true,
    message:"Moderator updated successfully",
    data:moderator,
  })
  } catch (error) {
    console.log(error)
    next(error)
  }
}



export const getAllClients = async(req,res,next)=>{
  try {
    const page = Math.max(0, Number.parseInt(req.query.page, 10) || 0);
    const pageSize = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.pageSize, 10) || 10),
    );
    const search =
      typeof req.query.search === "string" ? req.query.search.trim() : "";
    const filter = { role: "client" };

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchPattern = new RegExp(escapedSearch, "i");
      filter.$or = [
        { full_name: searchPattern },
        { username: searchPattern },
        { email: searchPattern },
      ];
    }

    const [users, itemCount] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(page * pageSize)
        .limit(pageSize),
      User.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: users,
      itemCount,
    });

  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getSingleClient = async(req,res,next) =>{
  try {
    const {id} = req.params;
    const client =await User.findOne({
      _id:id,
      role:"client"
    }).select("-password")
    if(!client){
      return res.status(404).json({message:"Client not found"})
    }
    return res.status(200).json({
      success:true,
      data:client
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const updateClientStatus = async(req,res,next) =>{
  try {
    const {status,id} = req.body;
    const updatedData = await User.findByIdAndUpdate({
      _id:id,
      role:"client"
    },
    {
      $set:{status}
    },
    {
      new:true
    })
    if(updatedData){
      return res.status(200).json({
        data:updatedData,
        message:"Client status updated successfully"
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getSingleFreelancer = async(req,res,next) =>{
  try {
    const {id} = req.params;
    const freelancer =await User.findOne({
      _id:id,
      role:"freelancer"
    }).select("-password")
    if(!freelancer){
      return res.status(404).json({message:"Freelancer not found"})
    }
    return res.status(200).json({
      success:true,
      data:freelancer
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const updateFreelancerStatus = async(req,res,next) =>{
  try {
    const {status,id} = req.body;
    const updatedData = await User.findByIdAndUpdate({
      _id:id,
      role:"freelancer"
    },
    {
      $set:{status}
    },
    {
      new:true
    })
    if(updatedData){
      return res.status(200).json({
        data:updatedData,
        message:"Client status updated successfully"
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getAllFreelancers = async(req,res,next)=>{
  try {
    const page = Math.max(0, Number.parseInt(req.query.page, 10) || 0);
    const pageSize = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.pageSize, 10) || 10),
    );
    const search =
      typeof req.query.search === "string" ? req.query.search.trim() : "";
    const filter = { role: "freelancer" };

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchPattern = new RegExp(escapedSearch, "i");
      filter.$or = [
        { full_name: searchPattern },
        { username: searchPattern },
        { email: searchPattern },
      ];
    }

    const [users, itemCount] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(page * pageSize)
        .limit(pageSize),
      User.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: users,
      itemCount,
    });

  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const deleteClient = async(req,res,next)=>{
  try {
    const {id} = req.body;
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(400, "Invalid moderator ID");
    }
    const moderator = await User.findOneAndDelete({
      _id:id,
      role:"client"
    })
    if(!moderator){
      return res.status(404).json({message:"Client not found"})
    }
    return res.status(200).json({message:"Client deleted successfully"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const deleteFreelancer = async(req,res,next)=>{
  try {
    const {id} = req.body;
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(400, "Invalid moderator ID");
    }
    const moderator = await User.findOneAndDelete({
      _id:id,
      role:"freelancer"
    })
    if(!moderator){
      return res.status(404).json({message:"Freelancer not found"})
    }
    return res.status(200).json({message:"Freelancer deleted successfully"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}