import React, { useContext, useCallback } from 'react';
import { TaskContext } from '../context/TaskContext';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import style from '../assets/css/Task.module.css';


const TaskList: React.FC = () => {
  const { tasks, toggleComplete, deleteTask } = useContext(TaskContext) || { tasks: [] };

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    const taskElement = target.closest('[data-task-id]');
    if (taskElement) {
      const taskId = Number(taskElement.getAttribute('data-task-id'));
      
      if (target.closest('.close-icon')) {
        deleteTask!(taskId);
      } else {
        toggleComplete!(taskId);
      }
    }
  }, [toggleComplete, deleteTask]);

  return (
    <div className={style.home} onClick={handleClick}>
      {tasks.map((task) => (
        <div
          key={task.id}
          data-task-id={task.id}
          className={`${style.container} ${task.completed ? style.container_active : ''}`}
        >
          <div className={style.text}>
            {task.completed ? (
              <CheckCircleOutlineIcon className={style.completeIcon} />
            ) : (
              <PanoramaFishEyeIcon className={style.incompleteIcon} />
            )}
            <p>{task.text}</p>
          </div>
          <div className={style.text}>
            <CloseIcon className={`close-icon ${style.closeIcon}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
