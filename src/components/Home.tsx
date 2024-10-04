// src/App.tsx
import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import style from '../assets/css/Home.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { Modal, Box } from "@mui/material";

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
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    addTask!(newTask);
    setTaskText("");
    setOpen(false); 
  };

  const handleFilter = (state: ButtonState) => {
    setButtonState(state);
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    margin:'auto',
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
          <div>
            <button className={`${style.button} ${buttonState === ButtonState.All ? style.button_active : ""}`} onClick={() => handleFilter(ButtonState.All)}>All</button>
            <button className={`${style.button} ${buttonState === ButtonState.Completed ? style.button_active : ""}`} onClick={() => handleFilter(ButtonState.Completed)}>Completed</button>
            <button className={`${style.button} ${buttonState === ButtonState.Incomplete ? style.button_active : ""}`} onClick={() => handleFilter(ButtonState.Incomplete)}>Incomplete</button>
          </div>
        </div>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box sx={modalStyle}>
            <h2>Add New Task</h2>
            <textarea
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Enter task..."
              className={style.textarea}
            />
            <button onClick={handleSubmit} className={style.button}>
              Add Task
            </button>
          </Box>
        </Modal>
        <button onClick={() => setOpen(true)} className={style.addButton}>Add Task</button>
      </div>
    </div>
  );
};

export default Home;
