import { useState } from "react";
import { addHabit } from "../../store/habit";
import "./HabitTracker.css";

export const CreateHabit = () => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;

    addHabit(value.trim());
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      name="habit"
      className="habit-form"
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
  );
};
