export interface SnackbarOptions {
  message: string;
}

export interface SnackbarContextValue {
  showSnackbar: (options: SnackbarOptions) => void;
}
