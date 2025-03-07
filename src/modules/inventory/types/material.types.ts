import {
  PageResult,
  PaginationInput,
} from "@/modules/common/types/pagination.types";
import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";

export type Manufacturer = {
  id: string;
  manufacturerName: string;
};

export type Material = {
  id: number;
  name?: string;
  description?: string;
  longDescription?: string;
  customerPartId?: string;
  manufacturerName?: string;
  manufacturerPartId?: string;
  competitorName?: string;
  competitorPartName?: string;
  competitorPartId?: string;
  category?: string;
  unitOfMeasure?: string;
  unitQuantity?: number;
  requestedQuantity?: number;
  requestedUnitPrice?: number;
};
export type QueryMaterialsInput = {
  manufacturerName?: string;
  name?: string;
  pagination?: PaginationInput;
  sort?: GridSortModel;
};

export type UpdateMaterialInput = {
  id: number;
  name?: string;
  manufacturerName?: string;
  manufacturerPartId?: string;
  category?: string;
  requestedUnitPrice?: number;
};

export type SearchMaterialsResponse = {
  pagination: PageResult;
  result: Material[];
};

export type MaterialFiltersState = {
  pagination: GridPaginationModel;
  sort?: GridSortModel;
  filter?: GridFilterModel;
};

export enum MaterialFilterActionTypes {
  SetPaginationModel,
  SetFilterModel,
  SetSortModel,
}

export type MaterialFilterActions =
  | {
      type: MaterialFilterActionTypes.SetPaginationModel;
      payload: GridPaginationModel;
    }
  | {
      type: MaterialFilterActionTypes.SetFilterModel;
      payload: GridFilterModel;
    }
  | {
      type: MaterialFilterActionTypes.SetSortModel;
      payload: GridSortModel;
    };
