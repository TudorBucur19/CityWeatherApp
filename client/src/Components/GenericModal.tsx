import { Box, IconButton, Modal, Typography } from "@mui/material";
import type { IGenericModal } from "../types/components";
import type { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
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
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>
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
