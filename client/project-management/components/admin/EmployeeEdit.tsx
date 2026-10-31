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


import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, MenuItem, Stack, TextField } from '@mui/material';
import api from '@/lib/axios';
import toast from 'react-hot-toast';

interface Employee {
  username: string;
  full_name: string;
  email: string;
  isFullTime: boolean;
  status: 'active' | 'block';
}

const EmployeeEdit = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);

  const handleBack = React.useCallback(() => {
    router.push('/admin/employees');
  }, [router]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/auth/api/v1/auth/admin/moderators/${employeeId}`);
        setEmployee(res.data.data);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Failed to load employee.');
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!employee) return;

    try {
      await api.put(`/auth/api/v1/auth/admin/moderator/${employeeId}`, employee);
      toast.success('Employee updated successfully.');
      router.push('/admin/employees');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to update employee.');
    }
  };

  return (
    <div className="max-w-4xl mt-5">
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid #e3e8f0',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Full Name"
                value={employee?.full_name ?? ''}
                onChange={(event) => setEmployee((current) => current && {
                  ...current,
                  full_name: event.target.value,
                })}
                fullWidth
                required
              />
              <TextField
                label="Username"
                value={employee?.username ?? ''}
                onChange={(event) => setEmployee((current) => current && {
                  ...current,
                  username: event.target.value,
                })}
                fullWidth
                required
              />
              <TextField
                label="Email"
                type="email"
                value={employee?.email ?? ''}
                onChange={(event) => setEmployee((current) => current && {
                  ...current,
                  email: event.target.value,
                })}
                fullWidth
                required
              />
              <TextField
                label="Employment"
                select
                value={employee?.isFullTime ? 'full-time' : 'part-time'}
                onChange={(event) => setEmployee((current) => current && {
                  ...current,
                  isFullTime: event.target.value === 'full-time',
                })}
                fullWidth
              >
                <MenuItem value="full-time">Full time</MenuItem>
                <MenuItem value="part-time">Part time</MenuItem>
              </TextField>
              <TextField
                label="Status"
                select
                value={employee?.status ?? 'active'}
                onChange={(event) => setEmployee((current) => current && {
                  ...current,
                  status: event.target.value as Employee['status'],
                })}
                fullWidth
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="block">Blocked</MenuItem>
              </TextField>
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" size="large" disabled={!employee}>
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
  )
}

export default EmployeeEdit