"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  dummyLogin: (value: boolean) => void;
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


 const dummyLogin = (val:boolean)=>{
    localStorage.setItem("checklogin",val ? "true" : "false");
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
    <AuthContext.Provider value={{ user, setUser,dummyLogin,checkLogin,logout,code,setCode }}>
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
