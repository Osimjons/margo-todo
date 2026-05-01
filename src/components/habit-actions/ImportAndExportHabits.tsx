import { useState, type ChangeEvent } from "react";

import { Dialog, DialogTitle, IconButton, Stack } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";

import { downloader, uploader } from "../../utils/downloader";

interface IImportAndExportHabitsProps {
  isCanDownload: boolean;
}

export const ImportAndExportHabits = ({
  isCanDownload,
}: IImportAndExportHabitsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    const data = localStorage.getItem("HabitStore");
    downloader(data);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    uploader(file, "HabitStore");
  };
  return (
    <div className="habit-actions">
      <Stack
        direction="row"
        gap={1}
        width="100%"
        alignSelf="flex-end"
        justifyContent="flex-end"
      >
        <IconButton
          type="button"
          onClick={handleDownload}
          disabled={!isCanDownload}
        >
          <SimCardDownloadOutlinedIcon />
        </IconButton>

        <IconButton
          type="button"
          className="habit-actions"
          onClick={(e) => {
            e.bubbles = true;
            setIsOpen(true);
          }}
          size="small"
        >
          <UploadFileOutlinedIcon />
        </IconButton>
      </Stack>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "var(--border)",
            color: "var(--text-h)",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          {"Import habits from file"}
        </DialogTitle>

        <Stack
          mb={2}
          py={2}
          borderRadius={1}
          alignItems="center"
          justifyContent="center"
        >
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              // background: "var(--accent)",
              color: "var(--text-h)",
            }}
          />
        </Stack>
      </Dialog>
    </div>
  );
};
