import { Button, Stack, Dialog, DialogTitle } from "@mui/material";
import { resetAllCheckedDays } from "../../store/habit";
import { currentMonthName } from "../../utils/utils";
import { useState } from "react";

interface IHabitActionsProps {
  disabled: boolean;
}

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
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "var(--border)",
            color: "var(--text-h)",
            borderRadius: 3,
            p: 5,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          "You are going to reset all checked days for this month. Are you
          sure?"
        </DialogTitle>
        <Stack
          alignItems="center"
          justifyContent="center"
          gap={2}
          direction="row"
        >
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Yes
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--accent)" }}
            onClick={handleClose}
          >
            No
          </Button>
        </Stack>
      </Dialog>
    </div>
  );
};
