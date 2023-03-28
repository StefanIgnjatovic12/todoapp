import React, { useEffect, useState } from "react";
import "./App.css";
import {
  addTask,
  addSubtask,
  deleteTask,
  deleteSubTask,
  markTaskAsCompleted,
  markSubtaskAsCompleted,
} from "./redux/task/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";

import { store } from "./redux/store/store";
import { selectTasks } from "./redux/task/taskSlice";
import { SubtaskList } from "./components/SubtaskList";

function App() {
  const [taskName, setTaskName] = useState("");
  const [subtaskNames, setSubtaskNames] = useState({});

  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    console.log("State updated:", tasks);
  }, [tasks]);

  const handleAddTask = () => {
    dispatch(addTask(taskName));
    setTaskName("");
  };

  const handleAddSubtask = (taskId, subtaskName) => {
    dispatch(addSubtask(taskId, subtaskName));
    setSubtaskNames({ ...subtaskNames, [taskId]: "" });
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask({ taskId }));
  };

  const handleDeleteSubtask = (taskId, subTaskId) => {
    dispatch(deleteSubTask(taskId, subTaskId));
  };

  const handleMarkTaskAsCompleted = (taskId) => {
    dispatch(markTaskAsCompleted({ taskId }));
  };

  const handleMarkSubtaskAsCompleted = (subTaskId) => {
    dispatch(markSubtaskAsCompleted({ subTaskId }));
  };

  const handleSubtaskNameChange = (taskId, value) => {
    setSubtaskNames({ ...subtaskNames, [taskId]: value });
  };

  return (
    <Provider store={store}>
      <div>
        <h1>Tasks</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.name} {task.completed ? "completed" : "not completed"}
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <button onClick={() => handleMarkTaskAsCompleted(task.id)}>
                Mark as Completed
              </button>
              <SubtaskList
                parent={task}
                subtasks={task.subtasks}
                handleDeleteSubtask={handleDeleteSubtask}
                handleMarkSubtaskAsCompleted={handleMarkSubtaskAsCompleted}
                handleAddSubtask={handleAddSubtask}
                handleSubtaskNameChange={handleSubtaskNameChange}
                subtaskNames={subtaskNames}
              />
              <li>
                <input
                  type="text"
                  value={subtaskNames[task.id] || ""}
                  onChange={(e) =>
                    handleSubtaskNameChange(task.id, e.target.value)
                  }
                />
                <button
                  onClick={() =>
                    handleAddSubtask(task.id, subtaskNames[task.id])
                  }
                >
                  Add Subtask
                </button>
              </li>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
    </Provider>
  );
}

export default App;
