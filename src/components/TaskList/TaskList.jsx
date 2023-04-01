import React, { useState } from "react";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import "./tasklist.css";
import "../../styles/globalstyles.css";
import {
  handleMarkTaskAsCompleted,
  handleMarkTaskAsNotCompleted,
  handleEditTaskName,
} from "../../redux/data/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectTasks } from "../../redux/data/dataSlice";
import SubtaskList from "../SubtaskList/SubtaskList";
import { TaskMenu } from "../DropdownMenus/TaskMenu";
import EditableField from "../EditableField/EditableField";
import { AddTaskInputField } from "../AddTaskInputField/AddTaskInputField";
import "../../styles/globalstyles.css";
import { TabButtons } from "../TabButtons/TabButtons";

export function TaskList() {
  const dispatch = useDispatch();
  const allTasks = useSelector(selectTasks);
  const [tab, setTab] = useState("incomplete");

  let tasksToRender = [];
  if (tab === "incomplete" && allTasks !== null) {
    tasksToRender = allTasks.filter((task) => !task.completed);
  } else if (tab === "complete" && allTasks !== null) {
    tasksToRender = allTasks.filter((task) => task.completed);
  }

  return (
    <div className="task-list-background">
      <div className="task-list-container-main">
        {tab === "incomplete" && <AddTaskInputField />}
        <TabButtons setTab={setTab} />
        <div className="task-list-container">
          {tasksToRender.length > 0 ? (
            tasksToRender.map((task) => (
              <div className="task-container" key={task.id}>
                <div className="task-header-container">
                  <EditableField
                    parentType={task.type}
                    name={task.name}
                    onSave={(newName) =>
                      handleEditTaskName(dispatch, task.id, newName)
                    }
                  />

                  <div className="task-buttons-container">
                    <TaskMenu taskId={task.id} />
                    <Toggle
                      className="custom-toggle"
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
            ))
          ) : (
            <div className="task-list-empty-message">
              {tab === "incomplete"
                ? "No incomplete tasks..."
                : "No completed tasks..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
