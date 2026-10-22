import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
         type:String,
        required:true,
    },
    full_name:{
         type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["client","moderator","admin","freelancer"],
        default:"client"
    },
    status:{
        type:String,
        enum:["block","active"],
        default:"active"
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)
export default User