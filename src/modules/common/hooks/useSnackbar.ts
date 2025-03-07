import { useContext } from "react";
import SnackbarContext, {
  SnackbarContextType,
} from "../contexts/SnackbarContext";

const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar should be used inside SnackbarProvider");
  }
  return context;
};

export default useSnackbar;
