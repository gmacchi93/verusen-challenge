import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CustomDrawer from "./MenuDrawer.styled";
import Link from "next/link";

const DRAWER_WIDTH = 280;

type Props = {
  isMenuOpen: boolean;
};

const MenuDrawer = ({ isMenuOpen }: Props) => {
  return (
    <CustomDrawer
      open={isMenuOpen}
      variant="persistent"
      sx={{
        width: isMenuOpen ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} href="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </CustomDrawer>
  );
};

export default MenuDrawer;
