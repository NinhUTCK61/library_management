import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { Form } from "./Form";
import RequestProvider from "./RequestProvider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

type Props = {
  open: boolean;
  handleToggle: () => void;
};

export const useRequestModal = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);

  return { open, handleToggle };
};

export const RequestModal = ({ open, handleToggle }: Props) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RequestProvider>
            <Form />
          </RequestProvider>
        </Box>
      </Modal>
    </>
  );
};
