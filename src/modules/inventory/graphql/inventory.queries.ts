import { gql } from "@apollo/client";
import { MATERIAL_FRAGMENT } from "./inventory.fragments";

export const SEARCH_MATERIAL_RESULT_QUERY = gql`
  ${MATERIAL_FRAGMENT}
  query SearchMaterials($input: QueryMaterialsInput) {
    searchMaterials(input: $input) {
      result {
        ...MaterialFragment
      }
      pagination {
        totalCount
      }
    }
  }
`;

export const GET_MATERIAL_BY_ID = gql`
  ${MATERIAL_FRAGMENT}
  query GetMaterialById($id: String) {
    getMaterialById(id: $id) {
      ...MaterialFragment
    }
  }
`;

export const SEARCH_MANUFACTURER_RESULT_QUERY = gql`
  query SearchManufacturers($name: String) {
    searchManufacturers(name: $name) {
      id: manufacturerPartId
      manufacturerName
    }
  }
`;
