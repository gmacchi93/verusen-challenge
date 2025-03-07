import MaterialEditForm from "@/modules/inventory/components/MaterialEditForm";
import withMaterialDetail from "@/modules/inventory/hocs/withMaterialDetail";
import useMaterialDetail from "@/modules/inventory/hooks/useMaterialDetail";
import React from "react";

const MaterialDetailEditPage = () => {
  const { material } = useMaterialDetail();

  return <MaterialEditForm material={material} />;
};

export default withMaterialDetail(MaterialDetailEditPage);
