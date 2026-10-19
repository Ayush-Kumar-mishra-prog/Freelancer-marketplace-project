'use client';

import CssBaseline from '@mui/material/CssBaseline';
import DialogsProvider from '@/hooks/useDialogs/DialogsProvider';
import NotificationsProvider from '@/hooks/useNotifications/NotificationsProvider';
import EmployeeList from './EmployeeList';

export default function CrudDashboard() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <EmployeeList />
        </DialogsProvider>
      </NotificationsProvider>
    </>
  );
}
