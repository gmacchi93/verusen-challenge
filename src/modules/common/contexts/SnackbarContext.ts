import { AlertProps } from "@mui/material";
import { createContext } from "react";

export type SnackbarContextType = {
  showSnackbar: (
    message: string,
    duration?: number,
    severity?: AlertProps["severity"]
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export default SnackbarContext;
