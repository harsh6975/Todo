import React, { createContext, useReducer, ReactNode, useEffect } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  toggleComplete: (taskId: number) => void;
}

const initialTasks: Task[] = [];

export const TaskContext = createContext<TaskContextType | null>(null);

const taskReducer = (state: Task[], action: any) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "TOGGLE_COMPLETE":
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case "SET_TASKS":
      return action.payload;
    default:
      return state;
  }
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  useEffect(() => {
    const storedTasksString = localStorage.getItem("tasks");
    if (storedTasksString) {
      try {
        const storedTasks: Task[] = JSON.parse(storedTasksString);
        dispatch({ type: "SET_TASKS", payload: storedTasks });
      } catch (error) {
        console.error("Failed to parse tasks from local storage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task: Task) => dispatch({ type: "ADD_TASK", payload: task });
  const deleteTask = (taskId: number) => dispatch({ type: "DELETE_TASK", payload: taskId });
  const toggleComplete = (taskId: number) => dispatch({ type: "TOGGLE_COMPLETE", payload: taskId });

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};
