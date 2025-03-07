import { gql } from "@apollo/client";

export const SEARCH_MATERIAL_RESULT_QUERY = gql`
  query SearchMaterials($input: QueryMaterialsInput) {
    searchMaterials(input: $input) {
      result {
        id
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

export const SEARCH_MANUFACTURER_RESULT_QUERY = gql`
  query SearchManufacturers($name: String) {
    searchManufacturers(name: $name) {
      manufacturerName
      manufacturerPartId
    }
  }
`;
