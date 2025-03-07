import { gql } from "@apollo/client";

export const MATERIAL_FRAGMENT = gql`
  fragment MaterialFragment on Material {
    id
    name
    category
    manufacturerName
    manufacturerPartId
    requestedUnitPrice
  }
`;
