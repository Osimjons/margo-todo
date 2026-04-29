import { toast } from "react-toastify";
import { EnumTypes, type ITodo } from "./../models/task";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IState {
  todos: ITodo[];
  filterType: EnumTypes;

  setFilterType: (type: EnumTypes) => void;
  setNewTask: (payload: ITodo["description"]) => void;
  deleteTask: (id: string) => void;
  changeStatusTask: (id: ITodo["id"]) => void;
  updateTask: (payload: Partial<ITodo>) => void;
  setToggleCompletedAllTask: () => void;
  setClearCompleted: () => void;
}

const initialState: IState = {
  todos: [],
  filterType: EnumTypes.ALL,
  setFilterType: () => {},
  setNewTask: () => {},
  deleteTask: () => {},
  updateTask: () => {},
  changeStatusTask: () => {},
  setToggleCompletedAllTask: () => {},
  setClearCompleted: () => {},
};

export const useTaskStore = create<IState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setNewTask: (payload: ITodo["description"]) =>
          set(
            (state) => ({
              todos: [
                ...state.todos,
                {
                  id: uuidv4(),
                  completed: false,
                  createdAt: new Date(),
                  description: payload,
                  edited: null,
                },
              ],
            }),
            false,
            "setNewTask",
          ),

        deleteTask: (id: string) => {
          set(
            (state) => ({
              todos: state.todos.filter((todo) => todo.id !== id),
            }),
            false,
            "deleteTask",
          );
          toast("Task has been deleted", {
            type: "default",
            autoClose: 2000,
          });
        },

        changeStatusTask: (id: string) => {
          set(
            (state) => ({
              todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
              ),
            }),
            false,
            "changeStatusTask",
          );
          toast("Task status has been completed", {
            type: "info",
            autoClose: 2000,
          });
        },

        setFilterType: (type: EnumTypes) => set({ filterType: type }),

        setToggleCompletedAllTask: () => {
          set((state) => {
            const allCompleted = state.todos.every((todo) => todo.completed);

            return {
              todos: state.todos.map((todo) => ({
                ...todo,
                completed: !allCompleted,
              })),
            };
          });
        },

        setClearCompleted: () => {
          set((state) => ({
            todos: state.todos.filter((todo) => !todo.completed),
          }));

          toast("Completed tasks has been deleted", {
            type: "default",
            autoClose: 2000,
          });
        },

        updateTask: (payload: Partial<ITodo>) =>
          set((state) => {
            const updatedTodos = [...state.todos];
            const index = updatedTodos.findIndex(
              (todo) => todo.id === payload.id,
            );
            if (index !== -1) {
              updatedTodos[index] = { ...updatedTodos[index], ...payload };
            }
            return { todos: updatedTodos };
          }),
      }),
      { name: "TaskStore" },
    ),
  ),
);

export const useTodo = () => useTaskStore((store) => store.todos);

export const addNewTask = (payload: ITodo["description"]) =>
  useTaskStore.getState().setNewTask(payload);

export const deleteTask = (id: string) =>
  useTaskStore.getState().deleteTask(id);

export const updateTask = (payload: Partial<ITodo>) =>
  useTaskStore.getState().updateTask(payload);

export const changeStatusTask = (id: string) =>
  useTaskStore.getState().changeStatusTask(id);

export const toggleCompletedAllTask = () =>
  useTaskStore.getState().setToggleCompletedAllTask();

export const clearCompletedTask = () =>
  useTaskStore.getState().setClearCompleted();

export const setFilterType = (type: EnumTypes) =>
  useTaskStore.getState().setFilterType(type);
