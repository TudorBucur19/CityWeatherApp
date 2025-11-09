import type { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { ILabelValueBox } from "../types/components";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0.5,
    minWidth: 220,
  },
};

const LabelValueBox: FC<ILabelValueBox> = ({ label, value, icon }) => {
  return (
    <Box sx={styles.container}>
      <Stack direction="row" spacing={0.75} alignItems="center">
        {icon && (
          <Box sx={{ color: "text.secondary", display: "inline-flex" }}>
            {icon}
          </Box>
        )}
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
};

export default LabelValueBox;
