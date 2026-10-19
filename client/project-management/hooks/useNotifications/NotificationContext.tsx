import * as React from 'react';
import { CloseNotification, ShowNotification } from './useNotification';


const NotificationsContext = React.createContext<{
  show: ShowNotification;
  close: CloseNotification;
} | null>(null);

export default NotificationsContext;