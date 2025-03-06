import { gql } from "@apollo/client";

export const SEARCH_MATERIAL_RESULT_QUERY = gql`
  query SearchMaterials($input: QueryMaterialsInput) {
    searchMaterials(input: $input) {
      result {
        name
        category
        manufacturerName
        requestedUnitPrice
      }
      pagination {
        totalCount
      }
    }
  }
`;
