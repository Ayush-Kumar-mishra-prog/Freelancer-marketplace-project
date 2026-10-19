import * as React from 'react';
import DialogsContext from './DialogsContext';

export type DialogComponent<P, R> = React.ComponentType<{
  payload: P;
  open: boolean;
  onClose: (result: R) => Promise<void>;
}>;

export interface OpenDialogOptions<R> {
  onClose?: (result: R) => Promise<void>;
}

export type OpenDialog = <P, R>(
  component: DialogComponent<P, R>,
  payload: P,
  options?: OpenDialogOptions<R>,
) => Promise<R>;

export type CloseDialog = <R>(
  dialog: Promise<R>,
  result: R,
) => Promise<R>;

export function useDialogs() {
  const dialogsContext = React.useContext(DialogsContext);
  if (!dialogsContext) {
    throw new Error('Dialogs context was used without a provider.');
  }
  return dialogsContext;
}
