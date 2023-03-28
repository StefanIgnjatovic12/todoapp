import React, { useState } from "react";

//use context API instead of prop drilling
export function SubtaskList({
  parent,
  subtasks,
  handleMarkSubtaskAsCompleted,
  handleDeleteSubtask,
  handleAddSubtask,
}) {
  const [subtaskNames, setSubtaskNames] = useState({});

  const handleSubtaskNameChange = (subtaskId, value) => {
    setSubtaskNames((prevState) => ({
      ...prevState,
      [subtaskId]: value,
    }));
  };

  if (subtasks.length === 0) {
    return null;
  }

  return (
    <ul>
      {subtasks.map((subtask) =>
        subtask ? (
          <li key={subtask.id}>
            {subtask.name} {subtask.completed ? "completed" : "not completed"}
            <button onClick={() => handleDeleteSubtask(parent.id, subtask.id)}>
              Delete
            </button>
            <button onClick={() => handleMarkSubtaskAsCompleted(subtask.id)}>
              Mark as Completed
            </button>
            <SubtaskList
              parent={parent}
              subtasks={subtask.subtasks}
              handleDeleteSubtask={handleDeleteSubtask}
              handleMarkSubtaskAsCompleted={handleMarkSubtaskAsCompleted}
              handleAddSubtask={handleAddSubtask}
            />
            <li>
              <input
                type="text"
                value={subtaskNames[subtask.id] || ""}
                onChange={(e) =>
                  handleSubtaskNameChange(subtask.id, e.target.value)
                }
              />
              <button
                onClick={() =>
                  handleAddSubtask(parent.id, subtaskNames[subtask.id])
                }
              >
                Add Subtask
              </button>
            </li>
          </li>
        ) : null
      )}
    </ul>
  );
}
