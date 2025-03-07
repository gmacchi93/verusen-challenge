import { createContext } from "react";
import { Material } from "../types/material.types";

const MaterialDetailContext = createContext<{ material: Material } | undefined>(
  undefined
);

export default MaterialDetailContext;
