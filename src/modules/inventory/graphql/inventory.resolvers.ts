import materials from "@/data/materials.json";
import { QueryMaterialsInput } from "../types/material.types";
import humps from "humps";
import { uniqBy } from "ramda";

type MaterialRawData = {
  id: number;
  name?: string | null;
  description?: string | null;
  long_description?: string | null;
  customer_part_id?: string | null;
  manufacturer_name?: string | null;
  manufacturer_part_id?: string | null;
  competitor_name?: string | null;
  competitor_part_name?: string | null;
  competitor_part_id?: string | null;
  category?: string | null;
  unit_of_measure?: string | null;
  unit_quantity?: number | null;
  requested_quantity?: number | null;
  requested_unit_price?: number | null;
};

const resolvers = {
  Query: {
    searchManufacturers: (
      _parent: unknown,
      { name }: { name: string },
      _context: unknown
    ) => {
      if (!name) {
        return [];
      }
      const uniqueManufacturers = uniqBy(
        (m) => m.manufacturer_name,
        materials as MaterialRawData[]
      );

      const filterManufacturers = uniqueManufacturers
        .filter((m) =>
          m.manufacturer_name?.toLowerCase().includes(name.toLowerCase())
        )
        .map((m) => ({
          manufacturerName: m.manufacturer_name,
          manufacturerPartId: m.manufacturer_part_id,
        }));

      return filterManufacturers;
    },
    searchMaterials: (
      _parent: unknown,
      { input }: { input: QueryMaterialsInput },
      _context: unknown
    ) => {
      const {
        manufacturerName = "",
        name = "",
        pagination = {
          page: 0,
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

      const { page, pageSize } = pagination;
      const totalCount = camelizedMaterials.length;
      const startIndex = page * pageSize;
      const paginatedMaterials = camelizedMaterials.slice(
        startIndex,
        startIndex + pageSize
      );

      return {
        result: paginatedMaterials,
        pagination: {
          page,
          pageSize,
          totalCount,
        },
      };
    },
  },
};

export default resolvers;
