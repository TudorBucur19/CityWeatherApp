import { Outlet } from "react-router";
import Box from "@mui/material/Box";

const AppLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AppLayout;
