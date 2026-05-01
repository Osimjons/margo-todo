import { Modal, Button, Stack } from "@mui/material";
import { resetAllCheckedDays } from "../../store/habit";
import { currentMonthName } from "../../utils/utils";
import { useState } from "react";

interface IHabitActionsProps {
  disabled: boolean;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "rgba(0, 0, 0, 0.8)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const HabitActions = ({ disabled }: IHabitActionsProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    resetAllCheckedDays();
    handleClose();
  };

  return (
    <div className="habit-actions">
      <button type="button" onClick={handleOpen} disabled={disabled}>
        Reset month
      </button>
      <p
        style={{
          textTransform: "capitalize",
          color: "var(--text-h)",
        }}
      >
        {currentMonthName}
      </p>
      <Modal open={open} onClose={handleClose}>
        <Stack
          sx={style}
          alignItems="center"
          justifyContent="center"
          gap={2}
          direction="row"
        >
          <Button variant="outlined" color="warning" onClick={handleDelete}>
            Are you sure?
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--accent)" }}
            onClick={handleClose}
          >
            cancel
          </Button>
        </Stack>
      </Modal>
    </div>
  );
};
