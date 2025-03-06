import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

const CustomDrawer = styled(Drawer)<{
  open: boolean;
}>(({ theme }) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        width: 0,
      },
    },
  ],
}));

export default CustomDrawer;
