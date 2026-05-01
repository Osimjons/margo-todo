import { useState } from "react";
import {
  useHabits,
  addHabit,
  deleteHabit,
  toggleHabitDay,
  resetAllCheckedDays,
} from "../../store/habit";

import "./HabitTracker.css";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const today = new Date().getDate(); // текущее число месяца

// получаем текущий месяц уже в строковом виде, чтобы отображать его в интерфейсе
const currentMonthName = new Date().toLocaleString("ru-RU", { month: "long" });
export const HabitTracker = () => {
  const habits = useHabits();
  const [value, setValue] = useState("");

  const disabled = habits.every((habit) => !habit.checkedDays.length);

  const handleSubmit = () => {
    if (!value.trim()) return;

    addHabit(value.trim());
    setValue("");
  };

  return (
    <div className="habit-tracker">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        name="habit"
      >
        <input
          type="text"
          placeholder="Add new habit"
          value={value}
          name="habit"
          onChange={(e) => setValue(e.target.value)}
        />

        <button type="submit">+</button>
      </form>

      {habits.length > 0 && (
        <div className="habit-grid">
          <div className="habit-actions">
            <button
              type="button"
              onClick={resetAllCheckedDays}
              disabled={disabled}
            >
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
          </div>
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

          {habits.map((habit) => (
            <div key={habit.id} className="habit-row">
              <div className="habit-name">
                <span>{habit.title}</span>

                <button type="button" onClick={() => deleteHabit(habit.id)}>
                  🗑️
                </button>
              </div>

              {days.map((day) => {
                const isChecked = habit.checkedDays.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    className={`habit-circle
                    ${isChecked ? "active" : ""}
                    ${day === today ? "today-circle" : ""}
                  `}
                    onClick={() => toggleHabitDay(habit.id, day)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
