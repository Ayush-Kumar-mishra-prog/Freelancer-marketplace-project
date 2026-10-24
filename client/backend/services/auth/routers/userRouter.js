import express from 'express'
import { banUser, getMe, login, logout, refresh, register } from '../controllers/user.controller.js'
import { checkRole } from '@ayush-kumar-mishra-prog/auth'
import verifyToken from '../middleware/verify-token.js'

const router = express.Router()
const auth = verifyToken
router.post('/login', login)
router.post('/register',register)
router.post('/refresh', refresh)
router.get('/me', auth, getMe)
router.post('/logout', auth, logout)
router.post('/admin/ban/:id', auth, checkRole("admin", "moderator"), banUser)
export default router