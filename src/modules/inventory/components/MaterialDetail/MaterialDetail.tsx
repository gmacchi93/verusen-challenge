import React from "react";
import { Material } from "../../types/material.types";
import { Box, Button, Paper, Typography } from "@mui/material";
import { currencyFormatter } from "@/modules/common/utils/currency.utils";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

type Props = {
  material: Material;
};

const MaterialDetail = ({ material }: Props) => {
  return (
    <Paper
      sx={{ px: 8, py: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={700} fontSize={16}>
          {material?.name}
        </Typography>
        <Button
          LinkComponent={Link}
          startIcon={<EditIcon />}
          sx={{ alignSelf: "flex-start" }}
          href={`/inventory/${material.id}/edit`}
        >
          Edit
        </Button>
      </Box>
      <Typography fontSize={14}>Category: {material?.category}</Typography>
      <Typography fontSize={14}>
        Manufacturer: {material?.manufacturerName}
      </Typography>
      <Typography fontSize={14}>
        Price: {currencyFormatter(material?.requestedUnitPrice)}
      </Typography>
    </Paper>
  );
};

export default MaterialDetail;
