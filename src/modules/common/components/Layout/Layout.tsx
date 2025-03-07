import React, { PropsWithChildren, useState } from "react";
import MenuAppBar from "@/modules/common/components/MenuAppBar";
import MenuDrawer from "@/modules/common/components/MenuDrawer";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Toolbar } from "@mui/material";

const Layout = ({ children }: PropsWithChildren) => {
  const [isMenuOpen, setisMenuOpen] = useState(true);

  const toogleMenuOpen = () => {
    setisMenuOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MenuAppBar toggleMenuOpen={toogleMenuOpen} />
      <MenuDrawer isMenuOpen={isMenuOpen} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box sx={{ px: 9, py: "52px" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
