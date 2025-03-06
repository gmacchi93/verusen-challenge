import materials from "@/data/materials.json";
import { QueryMaterialsInput, Material } from "../types/material.types";

const resolvers = {
  Query: {
    searchMaterials: (
      _: unknown,
      { input }: { input: QueryMaterialsInput }
    ) => {
      const {
        manufacturerName,
        name,
        pagination = {
          pageNumber: 1,
          pageSize: 10,
        },
      } = input;

      // Filter materials based on manufacturerName and name if provided
      let filteredMaterials = materials as Material[];
      if (manufacturerName) {
        filteredMaterials = filteredMaterials.filter((material) =>
          material.manufacturerName
            ?.toLowerCase()
            .includes(manufacturerName.toLowerCase())
        );
      }
      if (name) {
        filteredMaterials = filteredMaterials.filter((material) =>
          material.name?.toLowerCase().includes(name.toLowerCase())
        );
      }

      // Pagination logic
      const { pageNumber, pageSize } = pagination;
      const totalCount = filteredMaterials.length;
      const startIndex = (pageNumber - 1) * pageSize;
      const paginatedMaterials = filteredMaterials.slice(
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
