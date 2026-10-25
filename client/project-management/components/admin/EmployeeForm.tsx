'use client';

import { useState, type FormEvent } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import type { EmployeeValues } from './data/employees';
import { Button } from '@/untitledui/base/buttons/button';
import { Checkbox } from '@mui/material';
import {useForm, SubmitHandler}  from 'react-hook-form'
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import toast from 'react-hot-toast';

interface ModeratorFormData {
  username:string;
  full_name:string;
  email:string;
  password:string;
  isFullTime:boolean;
  status:string;
  role:string
}
export type FormFieldValue = string | number | boolean;

export interface EmployeeFormState {
  values: Partial<EmployeeValues>;
  errors: Partial<Record<keyof EmployeeValues, string | undefined>>;
}

interface EmployeeFormProps {
  formState: EmployeeFormState;
  onFieldChange: (name: keyof EmployeeValues, value: FormFieldValue) => void;
  onSubmit: () => Promise<void>;
  onReset: () => void;
  submitButtonLabel: string;
  backButtonPath?: string;
}

export default function EmployeeForm() {
  
   const {register,handleSubmit,setValue,watch,formState:{errors,isSubmitting}} = useForm<ModeratorFormData>({
    defaultValues:{
      username:"",
      full_name:"",
      email:"",
      password:"",
      isFullTime:false,
      status:"active",
      role:"moderator"
    }
   })

   const isFullTime = watch("isFullTime")
   const router = useRouter()

   const onSubmit:SubmitHandler<ModeratorFormData> = async(data)=>{
        try {
       const res =    await api.post('/auth/api/v1/auth/admin/createEmployee',data)
          router.push('/admin/employees')
          console.log(res)
          toast.success(res.data.message);
        } catch (error:any) {
          console.log(error)
          toast.error(error.response?.data?.message || error.message);
        }
   }

  // function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   void onSubmit();
  // }

  return (

    <>
    <div className="w-full mt-5">
      <h1 className="text-2xl text-slate-900 font-bold">Create moderator</h1>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} action="" className="lg:w-1/2 sm:w-full  p-2 ">
      <label htmlFor="" className="text-salte-900 mb-2 mt-2">Moderator username</label>
      <input type="text" className="w-full border border-gray-200 p-4 mb-2" placeholder="*Enter the moderator username" {...register("username",{required:"username is required"})} />
      {
        errors.username && <p className="text-red-700">{errors.username.message}</p>
      }

      <label htmlFor="" className="text-salte-900 mb-2 mt-2">Moderator full Name</label>
      <input type="text" className="w-full border border-gray-200 p-4 mb-2" placeholder="*Enter the moderator fullname" {...register("full_name",{required:" FullName is required"})} />
      {
        errors.full_name && <p className="text-red-700">{errors.full_name.message}</p>
      }

      <label htmlFor="" className="text-salte-900 mb-2 mt-2">Moderator Employee</label>
      <input type="email" className="w-full border border-gray-200 p-4 mb-2" placeholder="*Enter the moderator email" {...register("email",{required:"Email is required"})} />
      {
        errors.email && <p className="text-red-700">{errors.email.message}</p>
      }

      <label htmlFor="" className="text-salte-900 mb-2 mt-2">Moderator Password</label>
      <input type="password" className="w-full border border-gray-200 p-4 mb-2" placeholder="*Enter the moderator password" {...register("password",{required:"Password is required",
        minLength:{
          value:8,
          message:"Password must be at least 8 characters"
        }}
      )} />
       {
        errors.password && <p className="text-red-700">{errors.password.message}</p>
      }
      
      
               <FormControlLabel
      control={<Checkbox checked={isFullTime} onChange={(e)=>setValue("isFullTime",e.target.checked,{shouldDirty:true})} />}
      label="Moderator is full time"
    />
              <br />
<label htmlFor="" className="text-salte-900 mb-2 mt-2">Moderator status</label>
<select  id="" {...register("status")} className="w-full border border-gray-200 p-4 mb-2">
  <option value="active" className="">Active</option>
   <option value="block" className="">Block</option>
</select>
<label htmlFor="" className="text-salte-900 mb-2 mt-2">Role</label>
<select  id="" {...register("role")} className="w-full border border-gray-200 p-4 mb-2">
  <option value="moderator" className="">Moderator</option>
</select>

<Button type="submit" isDisabled={isSubmitting} className='bg-blue-600' size="lg">
  {isSubmitting ? "Creating...":"Create Moderator"}
</Button>

<Button onClick={()=>router.push('/admin/employees')} className='border border-blue-600 text-blue-600 ml-2' size="lg">Cancel</Button>
              
    </form>




    {/* <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 640, width: '100%' }}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          value={values.name ?? ''}
          error={Boolean(errors.name)}
          helperText={errors.name}
          onChange={(event) => onFieldChange('name', event.target.value)}
          required
        />
        <TextField
          label="Age"
          type="number"
          value={values.age ?? ''}
          error={Boolean(errors.age)}
          helperText={errors.age}
          onChange={(event) => onFieldChange('age', Number(event.target.value))}
          slotProps={{htmlInput:{min:18}}}
          required
        />
        <TextField
          type="date"
          value={values.joinDate ?? ''}
          error={Boolean(errors.joinDate)}
          helperText={errors.joinDate}
          onChange={(event) => onFieldChange('joinDate', event.target.value)}
          required
        />
        <FormControl error={Boolean(errors.role)} required>
          <InputLabel id="employee-role-label">Department</InputLabel>
          <Select
            labelId="employee-role-label"
            label="Department"
            value={values.role ?? ''}
            onChange={(event) => onFieldChange('role', event.target.value)}
          >
            <MenuItem value="Market">Market</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Development">Development</MenuItem>
          </Select>
          {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
        </FormControl>
        <FormControl error={Boolean(errors.isFullTime)}>
          <FormControlLabel
            control={
              <Switch
                checked={values.isFullTime ?? false}
                onChange={(event) => onFieldChange('isFullTime', event.target.checked)}
              />
            }
            label="Full-time"
          />
          {errors.isFullTime && <FormHelperText>{errors.isFullTime}</FormHelperText>}
        </FormControl>
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">
            {submitButtonLabel}
          </Button>
          <Button type="button" onClick={onReset}>
            Reset
          </Button>
          {backButtonPath && (
            <Button component="a" href={backButtonPath}>
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Box> */}
    </>
  );
}
