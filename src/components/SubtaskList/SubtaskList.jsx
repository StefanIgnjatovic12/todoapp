import React from "react";
import "react-toggle/style.css";
import "./subtasklist.css";
import Toggle from "react-toggle";
import {
  handleMarkSubtaskAsCompleted,
  handleMarkSubtaskAsNotCompleted,
  handleEditSubtaskName,
  handleToggleSubtaskIsCollapsed,
} from "../../redux/data/actions";
import { Collapse } from "react-collapse";
import { useDispatch, useSelector } from "react-redux";
import { selectSubtasks } from "../../redux/data/dataSlice";
import EditableField from "../EditableField/EditableField";
import { renderIcon, shades } from "../../redux/utils/helperFunctions";
import { SubtaskMenu } from "../DropdownMenus/SubtaskMenu";
import {
  getIndentation,
} from "../../redux/utils/helperFunctions";

const SubtaskList = React.memo(({ parentId, depth = 2 }) => {
  const dispatch = useDispatch();
  const subtasks = useSelector(selectSubtasks);

  const indentation = getIndentation(depth);

  if (!subtasks || subtasks.length === 0) {
    return null;
  }
  const subtasksToRender = subtasks.filter(
    (subtask) => subtask.parentId === parentId
  );

  return (
    <>
      {subtasksToRender.map((subtask) => {
        return (
          <div
            className="subtask-container"
            key={subtask.id}
            style={{
              marginLeft: indentation,
              borderLeft: `0.5px solid ${shades[depth - 2]}`,
            }}
          >
            <div className="subtask-header-container">
              <div className="subtask-name-container">
                <div
                  className="subtask-toggle"
                  onClick={() =>
                    handleToggleSubtaskIsCollapsed(dispatch, subtask.id)
                  }
                >
                  {/*add check to not have it if it doesnt have descendants*/}
                  {renderIcon(subtask, subtasks, depth)}
                </div>
                <EditableField
                  parentType={subtask.type}
                  name={subtask.name}
                  onSave={(newName) =>
                    handleEditSubtaskName(dispatch, subtask.id, newName)
                  }
                  depth={depth}
                />
              </div>
              <div className="subtask-buttons-container">
                <SubtaskMenu subTask={subtask} />
                <Toggle
                  key={subtask.id}
                  checked={subtask.completed}
                  onChange={(e) =>
                    e.target.checked
                      ? handleMarkSubtaskAsCompleted(dispatch, subtask.id)
                      : handleMarkSubtaskAsNotCompleted(dispatch, subtask.id)
                  }
                />
              </div>
            </div>
            <Collapse isOpened={!subtask.collapseChildren}>
              <SubtaskList parentId={subtask.id} depth={depth + 1} />
            </Collapse>
          </div>
        );
      })}
    </>
  );
});

SubtaskList.displayName = "SubtaskList";

export default SubtaskList;
