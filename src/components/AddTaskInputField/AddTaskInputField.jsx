import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleAddTask } from "../../redux/data/actions";
import "./addtaskinputfield.css";


export function AddTaskInputField() {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");

  return (
    <div className="task-add-container">
      <input
        className="task-add-input-field"
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button
        className="task-add-button"
        onClick={() => {
          taskName.length > 0 && handleAddTask(dispatch, taskName, setTaskName);
        }}
      >
        Add Task
      </button>
    </div>
  );
}
