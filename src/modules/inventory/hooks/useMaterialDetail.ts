import { useContext } from "react";
import MaterialDetailContext from "../contexts/MaterialContext";

const useMaterialDetail = () => {
  const ctx = useContext(MaterialDetailContext);

  if (!ctx) {
    throw new Error(
      "useMaterialDetail should be used inside withMaterialDetail HOC"
    );
  }

  return ctx;
};

export default useMaterialDetail;
