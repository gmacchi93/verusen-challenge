import { gql } from "graphql-tag";

const typeDefs = gql`
  type Manufacturer {
    manufacturerName: String
    manufacturerPartId: String
  }

  type Material {
    id: ID!
    name: String
    description: String
    longDescription: String
    customerPartId: String
    manufacturerName: String
    manufacturerPartId: String
    competitorName: String
    competitorPartName: String
    competitorPartId: String
    category: String
    unitOfMeasure: String
    unitQuantity: Int
    requestedQuantity: Int
    requestedUnitPrice: Float
  }

  input PaginationInput {
    page: Int
    pageSize: Int
  }

  input QueryMaterialsInput {
    manufacturerName: String
    name: String
    pagination: PaginationInput
  }

  type PageResult {
    page: Int
    pageSize: Int
    totalCount: Int
  }

  type SearchMaterialResult {
    result: [Material]!
    pagination: PageResult!
  }

  type Query {
    searchMaterials(input: QueryMaterialsInput): SearchMaterialResult
    searchManufacturers(name: String): [Manufacturer]
  }
`;

export default typeDefs;
