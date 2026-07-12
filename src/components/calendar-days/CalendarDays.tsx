import { Stack, Typography } from "@mui/material";
import { currentWeekday, days, today } from "../../utils/utils";

export const CalendarDays = () => {
  return (
    <div className="habit-days">
      <div className="habit-title-space" />
      {days.map((day) => (
        <Stack key={day}>
          {day === today && (
            <Typography color="var(--accent)">{currentWeekday}</Typography>
          )}
          <span className={`day-number ${day === today ? "today" : ""}`}>
            {day}
          </span>
        </Stack>
      ))}
    </div>
  );
};
