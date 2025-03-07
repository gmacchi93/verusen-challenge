import React from "react";
import {
  DataGrid,
  DataGridProps,
  getGridStringOperators,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { currencyFormatter } from "@/modules/common/utils/currency.utils";
import Box from "@mui/material/Box";
import ManufacturerAutocomplete from "../ManufacturerAutocomplete";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer sx={{ py: 1 }}>
      <Box sx={{ flex: 1 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </Box>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    disableColumnMenu: true,
    sortable: false,
    filterable: false,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    filterable: false,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    filterable: false,
  },
  {
    field: "manufacturerName",
    headerName: "Manufacturer",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    filterOperators: getGridStringOperators()
      .filter((op) => op.value === "equals")
      .map((op) => ({ ...op, InputComponent: ManufacturerAutocomplete })),
  },
  {
    field: "requestedUnitPrice",
    headerName: "Price",
    flex: 1,
    disableColumnMenu: true,
    filterable: false,
    valueFormatter: currencyFormatter,
  },
];

const MaterialGrid = (props: Partial<DataGridProps>) => {
  return (
    <DataGrid
      sx={{ border: 0 }}
      rowSelection={false}
      showCellVerticalBorder={false}
      showColumnVerticalBorder={false}
      columns={columns}
      slots={{ toolbar: CustomToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      pagination
      paginationMode="server"
      sortingMode="server"
      filterMode="server"
      pageSizeOptions={[10, 25, 50]}
      {...props}
    />
  );
};

export default MaterialGrid;
