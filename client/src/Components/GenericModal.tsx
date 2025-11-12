import type { FC } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import type { IGenericModal } from "../types/components";

import { genericModalStyles as styles } from "../styles/styles";

const GenericModal: FC<IGenericModal> = ({
  open,
  handleClose,
  title,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.modalContainer}>
        {title && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default GenericModal;
