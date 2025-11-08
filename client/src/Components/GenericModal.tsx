import { Box, Modal, Typography } from "@mui/material";
import type { IGenericModal } from "../types";
import type { FC } from "react";

const styles = {
  modalContainer: {
    maxWidth: 600,
    margin: "auto",
  },
};

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
