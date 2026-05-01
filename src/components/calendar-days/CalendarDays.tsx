import { days, today } from "../../utils/utils";

export const CalendarDays = () => {
  return (
    <div className="habit-days">
      <div className="habit-title-space" />

      {days.map((day) => (
        <span
          key={day}
          className={`day-number ${day === today ? "today" : ""}`}
        >
          {day}
        </span>
      ))}
    </div>
  );
};
