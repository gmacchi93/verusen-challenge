import React, { useEffect } from "react";
import {
  Manufacturer,
  Material,
  UpdateMaterialInput,
} from "../../types/material.types";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useFormik } from "formik";
import ManufacturerAutocomplete from "../ManufacturerAutocomplete";
import * as Yup from "yup";
import { UPDATE_MATERIAL_MUTATION } from "../../graphql/inventory.mutations";
import { useMutation } from "@apollo/client";
import { MATERIAL_FRAGMENT } from "../../graphql/inventory.fragments";
import { useRouter } from "next/router";
import useSnackbar from "@/modules/common/hooks/useSnackbar";

type Props = {
  material: Material;
};

const MaterialEditForm = ({ material }: Props) => {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const [updateMaterialMutation] = useMutation<
    { updateMaterial: Material },
    {
      input: UpdateMaterialInput;
    }
  >(UPDATE_MATERIAL_MUTATION, {
    update: (cache, { data }) => {
      const updatedMaterial = data?.updateMaterial;
      cache.updateFragment(
        {
          id: `Material:${data?.updateMaterial.id}`,
          fragment: MATERIAL_FRAGMENT,
        },
        (data) => {
          return {
            ...data,
            ...updatedMaterial,
          };
        }
      );
    },
  });

  const fk = useFormik({
    enableReinitialize: true,
    validateOnBlur: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required().label("Name"),
      category: Yup.string().label("Category"),
      manufacturerName: Yup.string().label("Name"),
      manufacturerPartId: Yup.string().label("Name"),
      requestedUnitPrice: Yup.number()
        .typeError("Price must be a number.")
        .required()
        .label("Price"),
    }),
    initialValues: {
      name: material.name ?? "",
      category: material.category ?? "",
      manufacturerName: material.manufacturerName ?? "",
      manufacturerPartId: material.manufacturerPartId ?? "",
      requestedUnitPrice: material.requestedUnitPrice ?? 0,
    },
    onSubmit: async (values) => {
      try {
        await updateMaterialMutation({
          variables: {
            input: { id: material.id, ...values },
          },
        });
        router.push(`/inventory/${material.id}`);
      } catch {
        showSnackbar("Something went wrong", 3000, "error");
      }
    },
  });

  return (
    <Paper
      sx={{ px: 8, py: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography fontWeight={700} fontSize={16}>
        Edit material
      </Typography>
      <Box
        component="form"
        onSubmit={fk.handleSubmit}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <TextField
          error={fk.touched.name && !!fk.errors.name}
          name="name"
          label="Name"
          value={fk.values.name}
          onChange={fk.handleChange}
          onBlur={fk.handleBlur}
          variant="standard"
          helperText={fk.touched.name ? fk.errors.name : ""}
        />
        <ManufacturerAutocomplete
          initial={
            material.manufacturerPartId
              ? ({
                  id: material.manufacturerPartId,
                  manufacturerName: material.manufacturerName,
                } as Manufacturer)
              : undefined
          }
          onChange={(newValue) => {
            fk.setFieldValue("manufacturerName", newValue?.manufacturerName);
            fk.setFieldValue("manufacturerPartId", newValue?.id);
          }}
        />
        <TextField
          error={fk.touched.category && !!fk.errors.category}
          name="category"
          label="Category"
          value={fk.values.category}
          onChange={fk.handleChange}
          onBlur={fk.handleBlur}
          variant="standard"
          helperText={fk.touched.category ? fk.errors.category : ""}
        />
        <TextField
          error={
            fk.touched.requestedUnitPrice && !!fk.errors.requestedUnitPrice
          }
          name="requestedUnitPrice"
          label="Price"
          value={fk.values.requestedUnitPrice}
          onChange={fk.handleChange}
          onBlur={fk.handleBlur}
          variant="standard"
          helperText={
            fk.touched.requestedUnitPrice ? fk.errors.requestedUnitPrice : ""
          }
        />
        <Box display="flex" gap={2} alignSelf="flex-end">
          <Button
            LinkComponent={Link}
            variant="text"
            href={`/inventory/${material.id}`}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MaterialEditForm;
