import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from "@/untitledui/base/buttons/button";
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgetPassword';
import AppTheme from '@/shared/AppTheme';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { LiaStarOfLifeSolid } from "react-icons/lia";
import { InputLabel, MenuItem, Select } from '@mui/material';
import {Controller, useForm} from 'react-hook-form'
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [mode,setMode] = React.useState("login")
  const [tab,setTab] = React.useState("login")
  const {user,setUser} = useAuth()

  const {register,handleSubmit,control,formState:{errors,isSubmitting},reset} = useForm()

  const onSubmit = async(data:any) =>{
    try {
      
      const res = await api.post(`/auth/api/v1/auth/${tab ==="signUP"? "register":"login"}`,data);
      console.log(res.data)

    } catch (error) {
      alert("Failed")
      console.log(error.response?.data?.message || error.message)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
    const handleChangeMode = ()=>{
    if(mode ==="login"){
        setMode("register")
    }
    if(mode ==="register"){
        setMode("login")
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  const roles = [
    "freelancer",
    "client",
    "moderator"
  ]

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

 

  
 


  return (
    <>
    <div className="w-full min-w-0 max-w-full">
      <div className="mb-2 flex w-full min-w-0 box-border bg-white border border-slate-300 p-1">
        <button className={`min-w-0 flex-1 cursor-pointer ${tab !=="signUP" ? "border border-slate-300 rounded-md p-2 bg-blue-500 text-white":""}`} onClick={()=>setTab("login")}>Login</button>
        <button className={`min-w-0 flex-1 cursor-pointer ${tab !=="login" ? "border border-slate-300 rounded-md p-2 bg-blue-500 text-white":""}`} onClick={()=>setTab("signUP")}>Sign Up</button>
      </div>
      
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <LiaStarOfLifeSolid size={25} className="text-purple-600" />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        {
                tab ==="login" ? "Sign In":"Sign Up"
            }
      </Typography>
      {/* <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
         {
                  
                    tab ==="signUP" && (
                        <>
                        <FormLabel htmlFor="username">Username</FormLabel>
                         <FormControl>
              
              
              <TextField
                
                id="username"
                type="name"
                placeholder="john"
                {...register("username",{required:"Username is required"})}
                autoFocus
                required
                fullWidth
                variant="outlined"
                error={!!errors.username}
                
              />
            </FormControl>

              
              <FormLabel htmlFor="email">Full Name</FormLabel>
              <FormControl>
              <TextField
                
                id="fullName"
                type="text"
                {...register("full_name",{required:"Full Name is required"})}
                placeholder="john sing"
                autoFocus
                required
                fullWidth
                variant="outlined"
                error={!!errors.full_name}
              />
            </FormControl>
                        </>
                    )
                }
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            {...register("email",{required:"Email is required",
              pattern:{
                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message:"Invalid email address"
              }
            })}
            placeholder="your@email.com"
            autoComplete="email"
            
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <span className="float-right lg:text-base sm:text-sm hover:text-underline" onClick={handleClickOpen}>Forgot Password</span>
            
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            {...register("password",{required:"Password is required",
              minLength:{
                value:6,
                message:"Password must be at least 6 characters long"
              }
            })}
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>

         <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <TextField {...field} fullWidth select label="Role" variant="outlined">
              {roles.map((role)=>(
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" className='bg-purple-600' onClick={validateInputs}>
          {
                tab ==="login" ? "Sign In":"Sign Up"
            }
        </Button>
       
      </Box> */}



      <form action="" className="flex flex-col w-full gap-2" onSubmit={handleSubmit(onSubmit)}>
         {
                  
                    tab ==="signUP" && (
                        <>
                        <label className="text-slate-800 text-sm ">Username</label>
                        <input type="text" placeholder="Enter your username" className="w-full border border-slate-300 rounded-md p-2 mb-2" {...register("username",{
                          required:"Username is requried"
                          
                        })} />
                        
                        

                         <label className="text-slate-800 text-sm">Full Name</label>
                        <input type="text" placeholder="Enter your full name" className="w-full border border-slate-300 rounded-md p-2 mb-2" {...register("full_name",{
                          required:"Full Name is requried"
                          
                        })} />
                        
                         

              
             
             
                        </>
                    )
                }

                <label className="text-slate-800 text-sm">Email</label>
                <input type="email" placeholder="Enter your email id" className="w-full border border-slate-300 rounded-md p-2 mb-2" {...register("email",{
                          required:"Email is required"
                          
                        })} />

                        <label className="text-slate-800 text-sm">Password</label>
                <input type="password" placeholder="••••••" className="w-full border border-slate-300 rounded-md p-2 mb-2" {...register("password",{
                          required:"Password is required"
                          
                        })} />

                        {
                          tab ==="signUP" && (
                            <select   {...register ("role",{required:"Please select a role"})} className="w-full mb-2 p-2 border border-slate-300 rounded-md">
                              {
                                roles.map((role)=>(
                                  <option value={role} key={role}  className="">{role}</option>
                                ))
                              }
                              
                              

                            </select>
                          )
                        }

                         <Button type="submit" className='bg-lime-900' size='lg' isDisabled={isSubmitting}>
          {
                tab ==="login" ? isSubmitting ? "Logging in...":"Login ":"Sign Up"
            }
        </Button>
                
      </form>





      
      <Divider>or</Divider>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button className='border border-blue-500 text-blue-500' 
          
          onClick={() => alert('Sign in with Google')}
          iconLeading={<FcGoogle />}
          
        >
          Sign in with Google
        </Button>
        <Button
         className='border border-blue-500 text-blue-500'
          onClick={() => alert('Sign in with Facebook')}
          iconLeading={<FaFacebook />}
        >
           Sign in with Facebook
        </Button>
      </Box>
    
    </div>
    </>
    
  );
}