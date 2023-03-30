import React, { useEffect, useState } from "react";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import {
  handleMarkSubtaskAsCompleted,
  handleDeleteSubtask,
  handleMarkSubtaskAsNotCompleted,
  handleEditSubtaskName,
} from "../../redux/data/actions";
import { AddSubtaskInputField } from "../AddSubtaskInputField/AddSubtaskInputField";
import { useDispatch, useSelector } from "react-redux";
import { selectSubtasks } from "../../redux/data/dataSlice";
import Collapse from "rc-collapse";
import EditableField from "../EditableField/EditableField";

import { SubtaskMenu } from "../DropdownMenus/SubtaskMenu";

export function SubtaskList({ parentId, level = 1 }) {
  const dispatch = useDispatch();
  const subtasks = useSelector(selectSubtasks);

  const filteredSubtasks = subtasks.filter(
    (subtask) => subtask.parentId === parentId
  );
  if (filteredSubtasks.length === 0) {
    return null;
  }

  const [collapsed, setCollapsed] = useState(level > 1);

  return (
    <Collapse
      activeKey={collapsed ? [] : ["0"]}
      onChange={() => setCollapsed(!collapsed)}
      collapsible={level >= 1}
    >
      <Collapse.Panel header="Subtasks test">
        {filteredSubtasks.map((subtask) =>
          subtask ? (
            <div className="subtask-container" key={subtask.id}>
              <div className="subtask-header-container">
                <EditableField
                  name={subtask.name}
                  onSave={(newName) =>
                    handleEditSubtaskName(dispatch, subtask.id, newName)
                  }
                />
                <div className="subtask-buttons-container">
                  <SubtaskMenu
                    handleDeleteSubtask={handleDeleteSubtask}
                    dispatch={dispatch}
                    subTaskId={subtask.id}
                  />
                  <Toggle
                    checked={subtask.completed}
                    onChange={(e) =>
                      e.target.checked
                        ? handleMarkSubtaskAsCompleted(dispatch, subtask.id)
                        : handleMarkSubtaskAsNotCompleted(dispatch, subtask.id)
                    }
                  />
                </div>
              </div>
              <SubtaskList parentId={subtask.id} level={level + 1} />
            </div>
          ) : null
        )}
      </Collapse.Panel>
    </Collapse>
  );
}
