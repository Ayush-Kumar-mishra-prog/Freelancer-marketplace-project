import express from 'express'
import { login, logout, register } from '../controllers/user.controller.js'
import { checkRole, verifyToken } from '@ayush-kumar-mishra-prog/auth'
import redis from '../redis.js'

const router = express.Router()
const auth = verifyToken(process.env.JWT_PUBLIC_KEY,redis)
router.post('/login', login)
router.post('/register',register)
router.post("/logout",auth,logout)
router.post("/admin/ban/:id",auth,checkRole("admin","moderator"))
export default router