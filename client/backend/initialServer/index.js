import express from 'express'
const app = express()

app.get('/',(req,res)=>{
   res.json("Initial server started")
})

app.listen((port = 3000) => console.log(`Server running on port ${port}`))