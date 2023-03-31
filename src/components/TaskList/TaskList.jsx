import React, { useState } from "react";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import "./tasklist.css";
import "../../styles/globalstyles.css";
import {
  handleMarkTaskAsCompleted,
  handleMarkTaskAsNotCompleted,
  handleAddTask,
  handleEditTaskName,
} from "../../redux/data/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";

import store from "../../redux/store/store";
import { selectSubtasks, selectTasks } from "../../redux/data/dataSlice";
import SubtaskList from "../SubtaskList/SubtaskList";
import { TaskMenu } from "../DropdownMenus/TaskMenu";
import EditableField from "../EditableField/EditableField";
import { hasDeepDescendants } from "../../redux/utils/helperFunctions";
import { AddTaskInputField } from "../AddTaskInputField/AddTaskInputField";

export function TaskList() {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const subtasks = useSelector(selectSubtasks);

  return (
    <div className="task-list-background">
      <div className="task-list-container">
        <AddTaskInputField />
        {tasks.length > 0 &&
          tasks.map((task) => (
            <div className="task-container" key={task.id}>
              <div className="task-header-container">
                <EditableField
                  name={task.name}
                  onSave={(newName) =>
                    handleEditTaskName(dispatch, task.id, newName)
                  }
                />

                <div className="task-buttons-container">
                  {/*task is giving undefined in taskmenu*/}
                  <TaskMenu dispatch={dispatch} taskId={task.id} />
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
            </div>
          ))}
      </div>
    </div>
  );
}
