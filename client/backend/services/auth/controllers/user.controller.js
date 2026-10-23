import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js"

export const register = async(req,res)=>{
    const {username,email,password,full_name,role,status} = req.body
    try {
        
        if(!username || !email || !password || !full_name){
            return res.status(400).json({message:"All fields are requried"})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"Email is already registered"})
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
            const token = generateToken(newUser);
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
        res.status(500).json({message:error})
    }
}

export const login = async(req,res)=>{
    const {email,password,role,status} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"})
        }
        if(role && user.role !== role){
            return res.status(403).json({message:"You are not authorized to login as this role"})
        }
        if(status && user.status !== status){
            return res.status(403).json({message:"Your account is not active"})
        }
        const token = generateToken(user);
        res.cookie("accessToken",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge: 7*24*60*60*1000,
            path:"/"
        })
        res.status(200).json({message:"Login successful", user, token})
    } catch (error) {
        res.status(500).json({message:"Error logging in", error})
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
            token:generateToken(user)
        })
    } catch (error) {
        res.status(500).json({message:"Error fetching user", error})
    }
}