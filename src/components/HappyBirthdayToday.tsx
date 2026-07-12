import { Button, Stack, Dialog, DialogTitle, Typography } from "@mui/material";
import JSConfetti from "js-confetti";
import { useEffect, useState } from "react";

export const HappyBirthdayToday = () => {
  const [open, setOpen] = useState(false);
  const handleBirthdayThanks = () => {
    const confetti = new JSConfetti();
    confetti.addConfetti({
      emojis: ["🎉", "🥳", "✨"],
      emojiSize: 30,
      confettiNumber: 180,
    });
    setOpen(false);
  };

  const happyBirthday = "24.10";
  const today = new Date();

  // Форматируем текущую дату в строку нужного формата (ДД.ММ.ГГГГ)
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Месяцы идут с 0 до 11

  const todayString = `${day}.${month}`;

  // Теперь сравниваем две строки
  const isHappyBirthdayToday = todayString === happyBirthday;

  useEffect(() => {
    if (isHappyBirthdayToday) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 0); // выполнится сразу после завершения текущего рендера

      return () => clearTimeout(timer); // очищаем таймер при размонтировании
    }
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "var(--border)",
          color: "var(--text-h)",
          borderRadius: 3,
          p: 5,
          zIndex: 99999999,
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        textAlign="center"
        sx={{ whiteSpace: "pre-wrap" }}
      >
        <Typography>Поздравляю тебя с днем рождения! 🥳</Typography>
        <Typography>
          Увы, со вчерашнего дня{" "}
          <Typography component="span" fontStyle="italic" fontSize="14px">
            (начало июля сейчас, 10.07.2026)
          </Typography>{" "}
          мы больше не вместе, чтобы я мог лично узнать, как у тебя дела. Но я
          очень надеюсь, что у тебя всё сложилось отлично. Искренне хочу, чтобы
          ты была счастлива.
        </Typography>
        <Typography fontSize="14px" fontStyle="italic" mt={2}>
          Удивлен,что ты до сих пор пользуешься этим приложением, но я рад, что
          оно тебе помогает. Я надеюсь, что ты продолжишь использовать его и в
          будущем, и что оно будет приносить тебе пользу.
        </Typography>
      </DialogTitle>
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
        gap={2}
      >
        <Button
          variant="contained"
          sx={{ bgcolor: "var(--accent)" }}
          onClick={handleBirthdayThanks}
        >
          Спасибо ☺️
        </Button>
      </Stack>
    </Dialog>
  );
};
