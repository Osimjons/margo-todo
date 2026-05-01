import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";

import { setSortedHabits, useHabits } from "../../store/habit";
import { HabitItem } from "./HabitItem";
import { CalendarDays } from "../calendar-days/CalendarDays";
import { HabitActions } from "../habit-actions/HabitActions";
import { CreateHabit } from "../create-habit/CreateHabit";

import "./HabitTracker.css";

export const HabitTracker = () => {
  const habits = useHabits();
  const disabled = habits.every((habit) => !habit.checkedDays.length);

  return (
    <div className="habit-tracker">
      <CreateHabit key={habits.length} />

      {habits.length > 0 && (
        <div className="habit-grid">
          <HabitActions disabled={disabled} />
          <CalendarDays />
          <DragDropProvider
            onDragEnd={(event) => {
              const { source } = event.operation;

              if (isSortable(source)) {
                const { initialIndex, index } = source;

                if (initialIndex !== index) {
                  const newItems = [...habits];
                  const [removed] = newItems.splice(initialIndex, 1);
                  newItems.splice(index, 0, removed);
                  setSortedHabits(newItems);
                }
              }
            }}
          >
            {habits.map((habit, index) => (
              <HabitItem key={habit.id} habit={habit} index={index} />
            ))}
          </DragDropProvider>
        </div>
      )}
    </div>
  );
};
