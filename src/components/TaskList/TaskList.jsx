import React, { useEffect, useState } from "react";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import "./tasklist.css";
import "../../styles/globalstyles.css";
import {
  handleMarkTaskAsCompleted,
  handleMarkTaskAsNotCompleted,
  handleDeleteTask,
  handleAddTask,
  handleEditTaskName,
} from "../../redux/data/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";

import { store } from "../../redux/store/store";
import { selectTasks } from "../../redux/data/dataSlice";
import { SubtaskList } from "../SubtaskList/SubtaskList";
import { AddSubtaskInputField } from "../AddSubtaskInputField/AddSubtaskInputField";
import { TaskMenu } from "../DropdownMenus/TaskMenu";
import EditableField from "../EditableField/EditableField";

export function TaskList() {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  return (
    <Provider store={store}>
      <div className="task-list-container">
        <div className="task-add-container">
          <input
            className="task-add-input-field"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button
            className="primary-button"
            onClick={() => handleAddTask(dispatch, taskName, setTaskName)}
          >
            Add Task
          </button>
        </div>
        {tasks.map((task) => (
          <div className="task-container" key={task.id}>
            <div className="task-header-container">
              <EditableField
                name={task.name}
                onSave={(newName) =>
                  handleEditTaskName(dispatch, task.id, newName)
                }
              />

              <div className="task-buttons-container">
                <TaskMenu
                  handleDeleteTask={handleDeleteTask}
                  dispatch={dispatch}
                  taskId={task.id}
                />
                <Toggle
                  checked={task.completed}
                  onChange={(e) =>
                    e.target.checked
                      ? handleMarkTaskAsCompleted(dispatch, task.id)
                      : handleMarkTaskAsNotCompleted(dispatch, task.id)
                  }
                />
              </div>
            </div>
            <SubtaskList parentId={task.id} />
            {/*<AddSubtaskInputField parentId={task.id} dispatch={dispatch} />*/}
          </div>
        ))}
      </div>
      {/*<SubtaskList parentId={"task1"} />*/}
    </Provider>
  );
}
