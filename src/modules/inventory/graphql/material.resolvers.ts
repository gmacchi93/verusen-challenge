import materials from "@/data/materials.json";
import { QueryMaterialsInput } from "../types/material.types";
import humps from "humps";

type MaterialRawData = {
  id: number;
  name?: string;
  description?: string;
  long_description?: string;
  customer_part_id?: string;
  manufacturer_name?: string;
  manufacturer_part_id?: string;
  competitor_name?: string;
  competitor_part_name?: string;
  competitor_part_id?: string;
  category?: string;
  unit_of_measure?: string;
  unit_quantity?: number;
  requested_quantity?: number;
  requested_unit_price?: number;
};

const resolvers = {
  Query: {
    searchMaterials: (_: unknown, input: QueryMaterialsInput) => {
      const {
        manufacturerName = "",
        name = "",
        pagination = {
          pageNumber: 1,
          pageSize: 10,
        },
      } = input;

      let filteredMaterials = materials as MaterialRawData[];

      if (manufacturerName) {
        filteredMaterials = filteredMaterials.filter((material) =>
          material.manufacturer_name
            ?.toLowerCase()
            .includes(manufacturerName.toLowerCase())
        );
      }
      if (name) {
        filteredMaterials = filteredMaterials.filter((material) =>
          material.name?.toLowerCase().includes(name.toLowerCase())
        );
      }

      const camelizedMaterials = filteredMaterials.map((material) =>
        humps.camelizeKeys(material)
      );

      const { pageNumber, pageSize } = pagination;
      const totalCount = camelizedMaterials.length;
      const startIndex = (pageNumber - 1) * pageSize;
      const paginatedMaterials = camelizedMaterials.slice(
        startIndex,
        startIndex + pageSize
      );

      return {
        result: paginatedMaterials,
        pagination: {
          pageNumber,
          pageSize,
          totalCount,
        },
      };
    },
  },
};

export default resolvers;
