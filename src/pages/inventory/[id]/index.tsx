import MaterialPresenter from "@/modules/inventory/components/MaterialDetail/MaterialDetail";
import withMaterialDetail from "@/modules/inventory/hocs/withMaterialDetail";
import useMaterialDetail from "@/modules/inventory/hooks/useMaterialDetail";
import React from "react";

const MaterialDetailPage = () => {
  const { material } = useMaterialDetail();

  return <MaterialPresenter material={material} />;
};

export default withMaterialDetail(MaterialDetailPage);
