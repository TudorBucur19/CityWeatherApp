import type { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { ILabelValueBox } from "../types/components";
import { labelValueBoxStyles as styles } from "../styles/styles";

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
