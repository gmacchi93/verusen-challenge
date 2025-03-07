import React, { PropsWithChildren, useState } from "react";
import SnackbarContext from "../../contexts/SnackbarContext";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";

type SnackbarState = {
  open: boolean;
  message: string;
  duration: number;
  severity: AlertProps["severity"];
};

const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    duration: 3000,
    severity: "info",
  });

  const showSnackbar = (
    message: string,
    duration: number = 3000,
    severity: AlertProps["severity"] = "info"
  ) => {
    setSnackbar({ open: true, message, duration, severity });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbar.open}
        onClose={handleClose}
        message={snackbar.message}
        autoHideDuration={snackbar.duration}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
