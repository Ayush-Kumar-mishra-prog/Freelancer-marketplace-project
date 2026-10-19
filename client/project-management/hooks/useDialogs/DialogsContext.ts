import * as React from 'react';
import type { CloseDialog, OpenDialog } from './useDialogs';

const DialogsContext = React.createContext<{
  open: OpenDialog;
  close: CloseDialog;
  confirm: (message: string) => Promise<boolean>;
} | null>(null);

export default DialogsContext;