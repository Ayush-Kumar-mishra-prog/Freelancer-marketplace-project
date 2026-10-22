import express from 'express'

const app = express()

app.use(express.json())
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routers/userRouter.js'
dotenv.config()
const port = process.env.PORT || 3001;
connectDB()

app.get('/',(req,res)=>{
    console.log(port)
    res.send("Auth server started")
})

app.use('/api/v1/auth',router)

app.listen(port,()=>console.log(`port ${port} is running`))