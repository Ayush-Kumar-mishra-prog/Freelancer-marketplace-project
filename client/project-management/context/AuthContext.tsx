"use client";

import api from "@/lib/axios";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthUser {
  name: string;
  email: string;
  full_name:string;
  username:string;
  role:string
}

interface AuthContextType {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  login: (email: string, password: string, role: string, status: string) => Promise<void>;
  register: (full_name: string, username: string, email: string, password: string, role: string, status: string) => Promise<void>;
  checkLogin: () => boolean;
  logout: () => void;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// creating the provider for the context to wrap the application and provide the context to all the components
export const AuthProvider = ({ children }: { children: ReactNode }) => {
 const [user, setUser] = useState<AuthUser | null>(null);
 const [code, setCode] = useState("");


const login = async(email:String,password:String,role:String,status:String)=>{
  try {
    const data = await api.post('/auth/api/v1/auth/login', { email, password, role, status })
    console.log(data)
    alert("Logged In success")
  } catch (error) {
    console.log(error)
    alert("Logged In failed")
  }
   
}

const register = async(full_name:String,username:String,email:String,password:String,role:String,status:String)=>{
  try {
    const data = await api.post('/auth/api/v1/auth/register', { full_name,username,email, password, role, status })
    console.log(data)
    alert("Registration success")
  } catch (error) {
    console.log(error)
    alert("Registration failed")
  }

}
 const checkLogin = ()=>{
  if(typeof window === "undefined"){
    return false;
  }
    const check = localStorage.getItem("checklogin");
    if(check === "true"){
        return true
    }else{
        return false
    }
 }

 const logout = ()=>{
    localStorage.removeItem("checklogin");
    setUser(null)
 }

  return (
    <AuthContext.Provider value={{ user, setUser,login,checkLogin,logout,code,setCode,register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
