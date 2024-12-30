import { createContext, ReactNode, useState } from 'react';
import { SnackbarContextValue, SnackbarOptions } from '../types/snackbar.types';
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';

export const SnackbarContext = createContext<SnackbarContextValue>({
  showSnackbar: () => {},
});

interface Props {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = (options: SnackbarOptions) => {
    setMessage(options.message);
    setOpen(true);
  };

  const handleClose = (_: any, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
