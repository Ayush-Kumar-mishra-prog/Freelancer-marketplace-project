import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    clientUsername: {
      type: String,
      required: true,
      unique: true,
    },
   
    project_name: {
      type: String,
      required: true,
    },
    project_description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["block", "active"],
      default: "active",
    },
    price:{
        type: Number,
        required: true,
    },
    project_image:{
        type:String,
        default:""
    },
    short_Discription:{
        type:'string',
        default:""
    },
    likes:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true

    },
    date:{
        type:String,
        required:true
    },
    freelancer:{
        type:String,
        default:""
    }
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);
export default Post;
