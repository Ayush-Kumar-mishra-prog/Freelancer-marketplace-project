import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import { errorHandler } from '@ayush-kumar-mishra-prog/auth'

const app = express()

app.use(express.json())
import connectDB from './config/db.js'
import router from './routers/userRouter.js'
const port = process.env.PORT || 3001;
app.use(cookieParser())
connectDB()

app.get('/',(req,res)=>{
    console.log(port)
    res.send("Auth server started")
})

app.use('/api/v1/auth',router)
app.use(errorHandler)

app.listen(port,()=>console.log(`port ${port} is running`))