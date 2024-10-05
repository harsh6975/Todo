import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import style from '../assets/css/Home.module.css';
import SearchIcon from '@mui/icons-material/Search';
import TaskList from "./TaskList";
import { ButtonState } from "./constants/enum";


const Home: React.FC = () => {
  const { addTask, setFilter,filter, search, setSearch } = useContext(TaskContext) || {};
  const [taskText, setTaskText] = useState<string>("");
  const [error, setError] = useState<string>("")

  const handleSubmit = () => {
    if (!taskText.trim()){
      setError("Task cann't be empty!!");
       return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    addTask!(newTask);
    setTaskText("");
  };

  const handleFilter = (state: ButtonState) => {
    setFilter!(state);
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
              value={search}
              onChange={(e) => setSearch!(e.target.value)}
              placeholder="Search"
              className={style.input_field}
            />
          </div>
          <div className={style.filter}>
            <button className={`${style.button} ${filter === ButtonState.All ? style.button_active : ""}`} onClick={() => handleFilter(ButtonState.All)}>All</button>
            <button className={`${style.button} ${filter === ButtonState.Completed ? style.button_active : ""}`} onClick={() => handleFilter(ButtonState.Completed)}>Completed</button>
            <button className={`${style.button} ${filter === ButtonState.Incomplete ? style.button_active : ""}`} onClick={() => handleFilter(ButtonState.Incomplete)}>Incomplete</button>
          </div>
        </div>
        <TaskList/>
        <input type="text" placeholder="Type Something" onChange={(e) => {setTaskText(e.target.value);setError("")}} className={`${style.textInput} ${error? style.textInputError:""}`} value={taskText}></input>
        {error && <p className={style.error}>{error}</p>}
        <button onClick={handleSubmit} className={style.addButton}>Add Task</button>
      </div>
    </div>
  );
};

export default Home;
