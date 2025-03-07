"use client";
import React, { useEffect, useMemo, useRef } from "react";
import MaterialGrid from "./MaterialGrid";
import { useLazyQuery } from "@apollo/client";
import {
  MaterialFilterActionTypes,
  QueryMaterialsInput,
  SearchMaterialsResponse,
} from "../../types/material.types";
import { SEARCH_MATERIAL_RESULT_QUERY } from "../../graphql/inventory.queries";
import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import useMaterialFilters from "../../hooks/useMaterialFilters";
import { useRouter } from "next/router";

const MaterialList = () => {
  const router = useRouter();
  const {
    filters,
    state: filterState,
    dispatch,
  } = useMaterialFilters({
    pagination: {
      page: 0,
      pageSize: 10,
    },
  });
  const [fetchMaterials, { data, loading, error }] = useLazyQuery<
    { searchMaterials: SearchMaterialsResponse },
    { input: QueryMaterialsInput }
  >(SEARCH_MATERIAL_RESULT_QUERY);

  const { result = [], pagination } = { ...data?.searchMaterials };

  const rowCountRef = useRef(pagination?.totalCount || 0);
  const rowCount = useMemo(() => {
    if (pagination?.totalCount !== undefined) {
      rowCountRef.current = pagination.totalCount;
    }
    return rowCountRef.current;
  }, [pagination?.totalCount]);

  const hasNextPage =
    !!pagination &&
    pagination.page * pagination.pageSize < pagination.totalCount;

  const handlePaginationChange = (paginationModel: GridPaginationModel) => {
    dispatch({
      type: MaterialFilterActionTypes.SetPaginationModel,
      payload: paginationModel,
    });
  };

  const handleFilterChange = (filterModel: GridFilterModel) => {
    dispatch({
      type: MaterialFilterActionTypes.SetFilterModel,
      payload: filterModel,
    });
  };

  const handleSortChange = (sortModel: GridSortModel) => {
    dispatch({
      type: MaterialFilterActionTypes.SetSortModel,
      payload: sortModel,
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchMaterials({
        variables: {
          input: filters,
        },
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [fetchMaterials, filters]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <MaterialGrid
      onRowClick={(params, _event, _details) => {
        router.push(`inventory/${params.id}`);
      }}
      rows={result}
      loading={loading}
      paginationModel={filterState.pagination}
      sortModel={filterState.sort}
      filterModel={filterState.filter}
      onPaginationModelChange={handlePaginationChange}
      onFilterModelChange={handleFilterChange}
      onSortModelChange={handleSortChange}
      paginationMeta={{
        hasNextPage: hasNextPage,
      }}
      rowCount={rowCount}
    />
  );
};

export default MaterialList;
