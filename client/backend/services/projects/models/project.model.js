import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    freelancer: {
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
      default:""
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
    }
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
