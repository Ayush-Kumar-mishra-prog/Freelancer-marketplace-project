'use client';

// import * as React from 'react';
// import Alert from '@mui/material/Alert';
// import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useRouter } from 'next/navigation';
// import useNotifications from '@/hooks/useNotifications/useNotification';
// import {
//   getOne as getEmployee,
//   updateOne as updateEmployee,
//   validate as validateEmployee,
//   type Employee,
// } from './data/employees';
// import EmployeeForm, {
//   type FormFieldValue,
//   type EmployeeFormState,
// } from './EmployeeForm';
// import PageContainer from './PageContainer';

// function EmployeeEditForm({
//   initialValues,
//   onSubmit,
// }: {
//   initialValues: Partial<EmployeeFormState['values']>;
//   onSubmit: (formValues: Partial<EmployeeFormState['values']>) => Promise<void>;
// }) {
//   const { employeeId } = useParams<{ employeeId: string }>();
//   const router = useRouter();

//   const notifications = useNotifications();

//   const [formState, setFormState] = React.useState<EmployeeFormState>(() => ({
//     values: initialValues,
//     errors: {},
//   }));
//   const formValues = formState.values;
//   const formErrors = formState.errors;

//   const setFormValues = React.useCallback(
//     (newFormValues: Partial<EmployeeFormState['values']>) => {
//       setFormState((previousState) => ({
//         ...previousState,
//         values: newFormValues,
//       }));
//     },
//     [],
//   );

//   const setFormErrors = React.useCallback(
//     (newFormErrors: Partial<EmployeeFormState['errors']>) => {
//       setFormState((previousState) => ({
//         ...previousState,
//         errors: newFormErrors,
//       }));
//     },
//     [],
//   );

//   const handleFormFieldChange = React.useCallback(
//     (name: keyof EmployeeFormState['values'], value: FormFieldValue) => {
//       const validateField = async (values: Partial<EmployeeFormState['values']>) => {
//         const { issues } = validateEmployee(values);
//         setFormErrors({
//           ...formErrors,
//           [name]: issues?.find((issue) => issue.path?.[0] === name)?.message,
//         });
//       };

//       const newFormValues = { ...formValues, [name]: value };

//       setFormValues(newFormValues);
//       validateField(newFormValues);
//     },
//     [formValues, formErrors, setFormErrors, setFormValues],
//   );

//   const handleFormReset = React.useCallback(() => {
//     setFormValues(initialValues);
//   }, [initialValues, setFormValues]);

//   const handleFormSubmit = React.useCallback(async () => {
//     const { issues } = validateEmployee(formValues);
//     if (issues && issues.length > 0) {
//       setFormErrors(
//         Object.fromEntries(issues.map((issue) => [issue.path?.[0], issue.message])),
//       );
//       return;
//     }
//     setFormErrors({});

//     try {
//       await onSubmit(formValues);
//       notifications.show('Employee edited successfully.', {
//         severity: 'success',
//         autoHideDuration: 3000,
//       });

//       router.push('/admin/employees');
//     } catch (editError) {
//       notifications.show(
//         `Failed to edit employee. Reason: ${(editError as Error).message}`,
//         {
//           severity: 'error',
//           autoHideDuration: 3000,
//         },
//       );
//     }
//   }, [formValues, router, notifications, onSubmit, setFormErrors]);

//   return (
//     <EmployeeForm
//       formState={formState}
//       onFieldChange={handleFormFieldChange}
//       onSubmit={handleFormSubmit}
//       onReset={handleFormReset}
//       submitButtonLabel="Save"
//       backButtonPath={`/admin/employees/${employeeId}`}
//     />
//   );
// }

// export default function EmployeeEdit() {
//   const { employeeId } = useParams<{ employeeId: string }>();

//   const [employee, setEmployee] = React.useState<Employee | null>(null);
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [error, setError] = React.useState<Error | null>(null);

//   const loadData = React.useCallback(async () => {
//     setError(null);
//     setIsLoading(true);

//     try {
//       const showData = await getEmployee(Number(employeeId));

//       setEmployee(showData);
//     } catch (showDataError) {
//       setError(showDataError as Error);
//     }
//     setIsLoading(false);
//   }, [employeeId]);

//   React.useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleSubmit = React.useCallback(
//     async (formValues: Partial<EmployeeFormState['values']>) => {
//       const updatedData = await updateEmployee(Number(employeeId), formValues);
//       setEmployee(updatedData);
//     },
//     [employeeId],
//   );

//   const renderEdit = React.useMemo(() => {
//     if (isLoading) {
//       return (
//         <Box
//           sx={{
//             flex: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: '100%',
//             m: 1,
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       );
//     }
//     if (error) {
//       return (
//         <Box sx={{ flexGrow: 1 }}>
//           <Alert severity="error">{error.message}</Alert>
//         </Box>
//       );
//     }

//     return employee ? (
//       <EmployeeEditForm initialValues={employee} onSubmit={handleSubmit} />
//     ) : null;
//   }, [isLoading, error, employee, handleSubmit]);

//   return (
//     <PageContainer
//       title={`Edit Employee ${employeeId}`}
//       breadcrumbs={[
//         { title: 'Employees', path: '/admin/employees' },
//         {
//           title: `Employee ${employeeId}`,
//           path: `/admin/employees/${employeeId}`,
//         },
//         { title: 'Edit' },
//       ]}
//     >
//       <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
//     </PageContainer>
//   );
// }


import React from 'react'
import { dummyEmployeeData } from './data/dummyEmployee';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';

const EmployeeEdit = () => {
     const { employeeId } = useParams<{ employeeId: string }>();
   const router = useRouter();
   const dummyData = dummyEmployeeData.find((data) => data.id === Number(employeeId))
    const handleBack = React.useCallback(() => {
       router.push('/admin/employees');
     }, [router]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className=''
            
          >
            <div className='max-w-4xl mt-5' >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e3e8f0",
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                  
    
                 
    
                  <Box component="form" >
                    <Stack spacing={2.5}>
                      <TextField
                        label="Name"
                        placeholder="Enter your Name"
                        value={dummyData?.name}
                        fullWidth
                        required
                      />
    
                       <TextField
                        label="Mobile Number"
                        type="email"
                        placeholder="Update your Mobile Number"
                        value={dummyData?.mobile}
                        fullWidth
                        required
                      />
    
                      <TextField
                        label="Email"
                        type="email"
                        placeholder="Update your email"
                        value={dummyData?.email}
                        fullWidth
                        required
                      />

                      <TextField
                        label="Age"
                        type="email"
                        placeholder="Update your Age"
                        value={dummyData?.age}
                        fullWidth
                        required
                      />

                      <TextField
                        label="Joining Date"
                        type="date"
                        placeholder="Update your Joining Date"
                        value={dummyData?.joinDate}
                        fullWidth
                        required
                      />

                      <TextField
                        label="Role"
                        type="name"
                        placeholder="Update your Role"
                        value={dummyData?.role}
                        fullWidth
                        required
                      />

                      <TextField
                        label="Full Time"
                        type="name"
                        placeholder="Full Time"
                        value={dummyData?.isFullTime ? "Yes":"No"}
                        fullWidth
                        required
                      />

                     
    
                       
    
                    
    
                      
    
                      

    
    
                      
    
                      <Box>
                        
    
                        
    
                        
                      </Box>
    
                     
    
                      <Stack direction="row" spacing={2}>
                        <Button
                          type="submit"
                          variant="contained"
                         
                          size="large"
                        >
                          Save profile
                        </Button>
    
                        <Button
                          type="button"
                          variant="outlined"
                          color="warning"
                          onClick={handleBack}
                          
                        >
                          Back
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
    
                 
                </CardContent>
              </Card>
            </div>
          </div>
        </LocalizationProvider>
  )
}

export default EmployeeEdit