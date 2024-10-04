// src/App.tsx
import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import style from '../assets/css/Home.module.css';
import SearchIcon from '@mui/icons-material/Search';
import TaskList from "./TaskList";

enum ButtonState {
  "All",
  "Completed",
  "Incomplete"
}

const Home: React.FC = () => {
  const { addTask } = useContext(TaskContext) || {};
  const [taskText, setTaskText] = useState<string>("");
  const [buttonState, setButtonState] = useState<ButtonState>(ButtonState.All);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSubmit = () => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    addTask!(newTask);
    setTaskText("");
  };

  const handleFilter = (state: ButtonState) => {
    setButtonState(state);
  };

  return (
    <div className={style.home}>
      <div className={style.content}>
        <div className={style.heading}>
          <p>Today</p>
          <div className={style.search_input}>
            <SearchIcon className={style.search_icon} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              className={style.input_field}
            />
          </div>
          <div className={style.filter}>
            <button className={`${style.button} ${buttonState === ButtonState.All ? style.button_active : ""}`} onClick={() => handleFilter(ButtonState.All)}>All</button>
            <button className={`${style.button} ${buttonState === ButtonState.Completed ? style.button_active : ""}`} onClick={() => handleFilter(ButtonState.Completed)}>Completed</button>
            <button className={`${style.button} ${buttonState === ButtonState.Incomplete ? style.button_active : ""}`} onClick={() => handleFilter(ButtonState.Incomplete)}>Incomplete</button>
          </div>
        </div>
        <TaskList/>
        <input type="text" placeholder="Type Something" onChange={(e) => setTaskText(e.target.value)} className={style.textInput} value={taskText}></input>
        <button onClick={handleSubmit} className={style.addButton}>Add Task</button>
      </div>
    </div>
  );
};

export default Home;
