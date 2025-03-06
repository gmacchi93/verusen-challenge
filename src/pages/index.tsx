import Layout from "@/modules/common/components/Layout";
import { SEARCH_MATERIAL_RESULT_QUERY } from "@/modules/inventory/graphql/material.queries";
import {
  QueryMaterialsInput,
  SearchMaterialsResponse,
} from "@/modules/inventory/types/material.types";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

export default function Home() {
  const [fetchMaterials, { data, loading, error }] = useLazyQuery<
    SearchMaterialsResponse,
    QueryMaterialsInput
  >(SEARCH_MATERIAL_RESULT_QUERY);

  console.log(data, loading, error);

  useEffect(() => {
    fetchMaterials({
      variables: {
        pagination: {
          pageSize: 10,
          pageNumber: 1,
        },
      },
    });
  }, [fetchMaterials]);

  return (
    <Layout>
      <p>Hello world</p>
    </Layout>
  );
}
