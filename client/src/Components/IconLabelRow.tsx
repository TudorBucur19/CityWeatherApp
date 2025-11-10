import type { FC } from "react";
import type { IIconLabelRow } from "../types/components";
import { Box, Stack } from "@mui/material";

// Small helper row using flexbox
const IconLabelRow: FC<IIconLabelRow> = ({ icon, children }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {icon && (
        <Box
          sx={{
            color: "text.secondary",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
      )}
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        {children}
      </Box>
    </Stack>
  );
};
export default IconLabelRow;
