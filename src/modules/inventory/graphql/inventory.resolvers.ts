import materials from "@/data/materials.json";
import {
  QueryMaterialsInput,
  UpdateMaterialInput,
} from "../types/material.types";
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
  requested_unit_price: number;
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
        sort = [],
      } = input;

      const enabledSort = sort.filter(
        (option) => option.field === "requestedUnitPrice"
      );

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

      if (!!enabledSort.length) {
        for (const sortOption of sort) {
          switch (sortOption.field) {
            case "requestedUnitPrice":
              filteredMaterials = filteredMaterials.sort((a, b) => {
                if (sortOption.sort === "asc") {
                  return a.requested_unit_price - b.requested_unit_price;
                } else {
                  return b.requested_unit_price - a.requested_unit_price;
                }
              });
              break;
            default:
              console.warn("Sort option not defined: ", sortOption.field);
          }
        }
      }

      const { page, pageSize } = pagination;
      const totalCount = filteredMaterials.length;
      const startIndex = page * pageSize;
      const paginatedMaterials = filteredMaterials.slice(
        startIndex,
        startIndex + pageSize
      );

      const camelizedMaterials = paginatedMaterials.map((material) =>
        humps.camelizeKeys(material)
      );

      return {
        result: camelizedMaterials,
        pagination: {
          page,
          pageSize,
          totalCount,
        },
      };
    },
    getMaterialById: (
      _parent: unknown,
      { id }: { id: string },
      _context: unknown
    ) => {
      const filteredMaterials = materials as MaterialRawData[];
      const material = filteredMaterials.find((m) => m.id.toString() === id);
      return humps.camelizeKeys(material);
    },
  },
  Mutation: {
    updateMaterial: (
      _parent: unknown,
      { input }: { input: UpdateMaterialInput },
      _context: unknown
    ) => {
      return input;
    },
  },
};

export default resolvers;
