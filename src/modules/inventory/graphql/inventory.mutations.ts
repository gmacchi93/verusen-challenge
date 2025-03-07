import { gql } from "@apollo/client";
import { MATERIAL_FRAGMENT } from "./inventory.fragments";

export const UPDATE_MATERIAL_MUTATION = gql`
  ${MATERIAL_FRAGMENT}
  mutation updateIndustryInfoMutation($input: UpdateMaterialInput!) {
    updateMaterial(input: $input) {
      ...MaterialFragment
    }
  }
`;
