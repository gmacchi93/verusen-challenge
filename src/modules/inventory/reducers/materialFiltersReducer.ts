import {
  MaterialFilterActions,
  MaterialFilterActionTypes,
  MaterialFiltersState,
} from "../types/material.types";

const reducer = (
  state: MaterialFiltersState,
  action: MaterialFilterActions
) => {
  switch (action.type) {
    case MaterialFilterActionTypes.SetPaginationModel:
      return {
        ...state,
        pagination: { ...action.payload, page: action.payload.page },
      };
    case MaterialFilterActionTypes.SetFilterModel:
      return {
        ...state,
        filter: action.payload,
        pagination: {
          ...state.pagination,
          page: 0,
        },
      };
    case MaterialFilterActionTypes.SetSortModel:
      return {
        ...state,
        sort: action.payload,
        pagination: {
          ...state.pagination,
          page: 0,
        },
      };
    default:
      throw new Error("Invalid action");
  }
};

export default reducer;
