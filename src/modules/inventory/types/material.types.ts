import {
  PageResult,
  PaginationInput,
} from "@/modules/common/types/pagination.types";

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
};

export type SearchMaterialsResponse = {
  pagination: PageResult;
  result: Material[];
};
