import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@/untitledui/base/buttons/button";
import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";
import ForgotPassword from "./ForgetPassword";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { LiaStarOfLifeSolid } from "react-icons/lia";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState("login");
  const [tab, setTab] = React.useState("login");
  const { user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
const router = useRouter()
  const onSubmit = async (data: any) => {
    try {
      const res = await api.post(
        `/auth/api/v1/auth/${tab === "signUP" ? "register" : "login"}`,
        data,
      );
      const resUser = await api.get('/auth/api/v1/auth/me')
      setUser(resUser.data.user)
      router.push('/')
      console.log(res.data);
      
      toast.success(res.data.message);
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  React.useEffect(()=>{
    console.log(user)
  },[user])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChangeMode = () => {
    if (mode === "login") {
      setMode("register");
    }
    if (mode === "register") {
      setMode("login");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const roles = ["freelancer", "client", "moderator"];

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      <div className="w-full min-w-0 max-w-full">
        <div className="mb-2 flex w-full min-w-0 box-border bg-white border border-slate-300 p-1">
          <button
            className={`min-w-0 flex-1 cursor-pointer ${tab !== "signUP" ? "border border-slate-300 rounded-md p-2 bg-blue-500 text-white" : ""}`}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={`min-w-0 flex-1 cursor-pointer ${tab !== "login" ? "border border-slate-300 rounded-md p-2 bg-blue-500 text-white" : ""}`}
            onClick={() => setTab("signUP")}
          >
            Sign Up
          </button>
        </div>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <LiaStarOfLifeSolid size={25} className="text-purple-600" />
        </Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          {tab === "login" ? "Sign In" : "Sign Up"}
        </Typography>

        <form
          action=""
          className="flex flex-col w-full gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {tab === "signUP" && (
            <>
              <label className="text-slate-800 text-sm ">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full border border-slate-300 rounded-md p-2 mb-2"
                {...register("username", {
                  required: "Username is requried",
                })}
              />

              <label className="text-slate-800 text-sm">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-slate-300 rounded-md p-2 mb-2"
                {...register("full_name", {
                  required: "Full Name is requried",
                })}
              />
            </>
          )}

          <label className="text-slate-800 text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email id"
            className="w-full border border-slate-300 rounded-md p-2 mb-2"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <label className="text-slate-800 text-sm">Password</label>
          <input
            type="password"
            placeholder="••••••"
            className="w-full border border-slate-300 rounded-md p-2 mb-2"
            {...register("password", {
              required: "Password is required",
            })}
          />

         <label className="text-slate-800 text-sm">Choose Role</label>
            <select
              {...register("role", { required: "Please select a role" })}
              className="w-full mb-2 p-2 border border-slate-300 rounded-md"
            >
              {roles.map((role) => (
                <option value={role} key={role} className="">
                  {role}
                </option>
              ))}
            </select>
          
          <ForgotPassword open={open} handleClose={handleClose} />

          <Button
            type="submit"
            className="bg-lime-900"
            size="lg"
            isDisabled={isSubmitting}
          >
            {tab === "login"
              ? isSubmitting
                ? "Logging in..."
                : "Login "
              : "Sign Up"}
          </Button>
        </form>

        <Divider>or</Divider>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            className="border border-blue-500 text-blue-500"
            onClick={() => alert("Sign in with Google")}
            iconLeading={<FcGoogle />}
          >
            Sign in with Google
          </Button>
          <Button
            className="border border-blue-500 text-blue-500"
            onClick={() => alert("Sign in with Facebook")}
            iconLeading={<FaFacebook />}
          >
            Sign in with Facebook
          </Button>
        </Box>
      </div>
    </>
  );
}
