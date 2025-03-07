import { useMemo, useReducer } from "react";
import reducer from "../reducers/materialFiltersReducer";
import { MaterialFiltersState } from "../types/material.types";

const useMaterialFilters = (initialState: MaterialFiltersState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const formattedFilters = useMemo(
    () => ({
      pagination: state.pagination,
      name: state.filter?.quickFilterValues?.join(" "),
      manufacturerName: state.filter?.items.find(
        (i) => i.field === "manufacturerName"
      )?.value?.name,
    }),
    [state]
  );

  return {
    filters: formattedFilters,
    state,
    dispatch,
  };
};

export default useMaterialFilters;
