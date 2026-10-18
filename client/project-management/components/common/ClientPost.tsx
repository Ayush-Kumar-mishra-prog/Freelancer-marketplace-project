"use client"
import { useState } from "react";
import RichTextEditor from "../textEditor/RichTextEditor";
import { Button } from "@mui/material";
import TableData from "./TableData";
import { ArrowLeft, ArrowRight } from "lucide-react";


export default function ClientPost() {
    const [showEditor,setShowEditor] = useState(false)
  return (
    <>

    <div className=" mt-5 w-full  ">
        {
            showEditor ? (
               <Button    variant="contained" startIcon={<ArrowLeft />} onClick={() => setShowEditor(!showEditor)} >Back
          
        </Button>
            ):(
                <Button    variant="contained" startIcon={<ArrowRight />} onClick={() => setShowEditor(!showEditor)} >Create Post
          
        </Button>
            )
        }
            
        </div>
        {
            showEditor ? <main className="py-10 bg-gray-50 min-h-screen ">
        
         
      <RichTextEditor />
    </main>:<div className="mt-5 border border-gray-200 rounded-lg shadow-sm">
        <TableData />
    </div>
        }
   
    
    </>
  )
}