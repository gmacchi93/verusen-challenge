import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Material } from "../types/material.types";
import { GET_MATERIAL_BY_ID } from "../graphql/inventory.queries";
import { useEffect } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import MaterialDetailContext from "../contexts/MaterialContext";

const withMaterialDetail = (Page: NextPage) => {
  const PageWithMaterialDetail = ({ ...props }) => {
    const router = useRouter();

    const { id } = router.query;

    const { data, loading, error } = useQuery<
      { getMaterialById: Material },
      { id: string }
    >(GET_MATERIAL_BY_ID, { variables: { id: id as string } });

    const { getMaterialById: material } = { ...data };

    useEffect(() => {
      console.error(error);
    }, [error]);

    if (loading) {
      return <CircularProgress />;
    }

    if (!material) {
      return (
        <>
          <Typography fontWeight={700} fontSize={16} color="error">
            Sorry! Material not found
          </Typography>
          <Button href="/">Go back to list</Button>
        </>
      );
    }

    return (
      <MaterialDetailContext.Provider
        value={{
          material,
        }}
      >
        <Page />
      </MaterialDetailContext.Provider>
    );
  };
  return PageWithMaterialDetail;
};

export default withMaterialDetail;
