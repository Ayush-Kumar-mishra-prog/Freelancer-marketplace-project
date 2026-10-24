import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'

import {AppError} from '@ayush-kumar-mishra-prog/auth'
import jwt from 'jsonwebtoken'
import redis from "../redis.js"

const PRIVET_KEY = process.env.JWT_PRIVATE_KEY || 'freeLancerMarketPlaceProject'
const ACCESS_TTL = 15*60;
const REFRESH_TTL = 7*24*60*60;

const issueTokens = async (user) => {
   const accessToken = jwt.sign({
    userId:user._id.toString(),
    role:user.role,
    jti:uuid()
   },PRIVET_KEY,{
    algorithum:"RS256",
    expiresIn:ACCESS_TTL
   })
   const refreshToken = uuid();
   await redis.set(`refresh:${refreshToken}`,user._id.toString(),"EX",REFRESH_TTL)
   return {accessToken,refreshToken}
}

export const register = async(req,res,next)=>{
    const {username,email,password,full_name,role,status} = req.body
    try {
        
        if(!username || !email || !password || !full_name){
            throw new AppError(400,"All fields are required")
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            throw new AppError(400,"This email is already registered")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            full_name,
            role,
            status
        })
        if(newUser){
            const token = issueTokens(newUser);
            res.cookie("accessToken",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                sameSite:"lax",
                maxAge: 7*24*60*60*1000,
                path:"/"
            })
        }
        await newUser.save()
        res.status(201).json({message:"User registered successfully", user:newUser})
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const login = async(req,res)=>{
    const {email,password,role,status} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            throw new AppError(404,"Email is not registered")
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            throw new AppError(401,"Invalid password")
        }
        if(role && user.role !== role){
            return res.status(403).json({message:"You are not authorized to login as this role"})
        }
        if(status && user.status !== status){
            return res.status(403).json({message:"Your account is not active"})
        }
        const token = issueTokens(user);
        res.cookie("accessToken",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge: 7*24*60*60*1000,
            path:"/"
        })
        res.status(200).json({message:"Login successful", user, token})
    } catch (error) {
        next(error)
    }
}

export const getMe = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            full_name:user.full_name,
            role:user.role,
            status:user.status,
            token:issueTokens(user)
        })
    } catch (error) {
        res.status(500).json({message:"Error fetching user", error})
    }
}

export const refresh = async(req,res,next) =>{
    try {
        const {refreshToken} = req.body;
        const userId = await redis.get(`refresh:${refreshToken}`);
        if(!userId) throw new AppError (401,"Invalid refresh token")
            await redis.del(`refresh:${refreshToken}`);
        const user = await User.findById(userId)
        if(!user)  throw new AppError(401,"User not found")
            res.json(await issueTokens(user))
    } catch (e) {
        next(e)
    }
}

export const logout = async(req,res,next) =>{
    try {
        const ttl = req.user.exp - Math.floor(Date.now()/1000)
        if(ttl >0) await redis.set(`bl:${req.user.jit}`,"1","EX",ttl)
            if(req.body.refreshToken) await  redis.del(`${req.body.refreshToken}`)
                res.json({message:"Logged Out"})
    } catch (e) {
        next(e)
    }
}

export const banUser = async(req,res,next) =>{
    try {
        await redis.set(`banned:${req.params.id}`)
        res.json({message:"User banned"})
    } catch (error) {
        next(error)
    }
}