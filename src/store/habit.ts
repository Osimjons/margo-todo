// store/habit.ts

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import type { IHabit } from "../models/habit";

interface IHabitState {
  habits: IHabit[];

  addHabit: (title: string) => void;
  editHabit: (payload: { id: string; newTitle: string }) => void;
  deleteHabit: (id: string) => void;
  toggleHabitDay: (habitId: string, day: number) => void;

  resetAllCheckedDays: () => void;
}

const initialState: IHabitState = {
  habits: [],
  addHabit: () => {},
  editHabit: () => {},
  deleteHabit: () => {},
  toggleHabitDay: () => {},
  resetAllCheckedDays: () => {},
};

export const useHabitStore = create<IHabitState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        addHabit: (title: string) => {
          set(
            (state) => ({
              habits: [
                ...state.habits,
                {
                  id: uuidv4(),
                  title,
                  checkedDays: [],
                  createdAt: new Date(),
                },
              ],
            }),
            false,
            "addHabit",
          );

          toast.success("Habit created");
        },
        editHabit: (payload: { id: string; newTitle: string }) => {
          set(
            (state) => {
              const editedHabit = state.habits.map((habit) =>
                habit.id === payload.id
                  ? { ...habit, title: payload.newTitle }
                  : habit,
              );

              toast.success("Habit edited successfully");
              return { habits: editedHabit };
            },
            false,
            "editHabit",
          );
        },

        deleteHabit: (id: string) => {
          set(
            (state) => ({
              habits: state.habits.filter((habit) => habit.id !== id),
            }),
            false,
            "deleteHabit",
          );

          toast.info("Habit deleted");
        },

        toggleHabitDay: (habitId: string, day: number) => {
          set(
            (state) => ({
              habits: state.habits.map((habit) => {
                if (habit.id !== habitId) return habit;

                const alreadyChecked = habit.checkedDays.includes(day);

                return {
                  ...habit,
                  checkedDays: alreadyChecked
                    ? habit.checkedDays.filter((d) => d !== day)
                    : [...habit.checkedDays, day],
                };
              }),
            }),
            false,
            "toggleHabitDay",
          );
        },

        resetAllCheckedDays: () => {
          set(
            (state) => ({
              habits: state.habits.map((habit) => ({
                ...habit,
                checkedDays: [],
              })),
            }),
            false,
            "resetAllCheckedDays",
          );

          toast.info("All habit progress has been reset");
        },
      }),
      {
        name: "HabitStore",
      },
    ),
  ),
);

export const useHabits = () => useHabitStore((store) => store.habits);

export const addHabit = (title: string) =>
  useHabitStore.getState().addHabit(title);

export const editHabit = (payload: { id: string; newTitle: string }) =>
  useHabitStore.getState().editHabit(payload);

export const deleteHabit = (id: string) =>
  useHabitStore.getState().deleteHabit(id);

export const toggleHabitDay = (habitId: string, day: number) =>
  useHabitStore.getState().toggleHabitDay(habitId, day);

export const resetAllCheckedDays = () =>
  useHabitStore.getState().resetAllCheckedDays();
