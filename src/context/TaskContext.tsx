import React, { createContext, useReducer, ReactNode, useEffect, useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

enum ButtonState {
  "All",
  "Completed",
  "Incomplete"
}

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filter: ButtonState;
  search: string;
  addTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  toggleComplete: (taskId: number) => void;
  setFilter: (filter: ButtonState) => void;
  setSearch: (search: string) => void;
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
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [filter, setFilter] = useState<ButtonState>(ButtonState.All);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(debouncedSearch.toLowerCase());
    if (filter === ButtonState.Completed) {
      return task.completed && matchesSearch;
    }
    if (filter === ButtonState.Incomplete) {
      return !task.completed && matchesSearch;
    }
    return matchesSearch;
  });


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [search]); 

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
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => dispatch({ type: "ADD_TASK", payload: task });
  const deleteTask = (taskId: number) => dispatch({ type: "DELETE_TASK", payload: taskId });
  const toggleComplete = (taskId: number) => dispatch({ type: "TOGGLE_COMPLETE", payload: taskId });

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleComplete, filteredTasks, filter, setFilter, search, setSearch }}>
      {children}
    </TaskContext.Provider>
  );
};
