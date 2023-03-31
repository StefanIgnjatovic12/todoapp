import React, { useRef } from "react";
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

import { SubtaskMenu } from "../DropdownMenus/SubtaskMenu";
import {
  getIndentation,
  hasDescendantWithDepthGreaterThanOrEqualTo,
} from "../../redux/utils/helperFunctions";

const SubtaskList = React.memo(({ parentId, depth = 2 }) => {
  const dispatch = useDispatch();
  const subtasks = useSelector(selectSubtasks);

  const indentation = getIndentation(depth);
  if (subtasks === undefined || subtasks.length === 0) {
    return null;
  }
  const subtasksToRender = subtasks.filter(
    (subtask) => subtask.parentId === parentId
  );
  const shouldApplyScrollableStyles =
    depth === 2 &&
    hasDescendantWithDepthGreaterThanOrEqualTo(parentId, 7, subtasks);


  return (
    <>
      {subtasksToRender.map((subtask) => {
        return (
          <div
            className={shouldApplyScrollableStyles ? "subtask-scrollbar" : null}
            key={subtask.id}
          >
            <div
              className="subtask-container"
              style={{ marginLeft: indentation }}
            >
              <div className="subtask-header-container">
                <div className="subtask-name-container">
                  <EditableField
                    name={`${subtask.name} with depth of ${subtask.depth}`}
                    onSave={(newName) =>
                      handleEditSubtaskName(dispatch, subtask.id, newName)
                    }
                  />
                  <div
                    className="subtask-toggle"
                    onClick={() =>
                      handleToggleSubtaskIsCollapsed(dispatch, subtask.id)
                    }
                  >
                    {subtask.collapseChildren ? "▼" : "▲"}
                  </div>
                </div>
                <div className="subtask-buttons-container">
                  <SubtaskMenu dispatch={dispatch} subTask={subtask} />
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
          </div>
        );
      })}
    </>
  );
});

SubtaskList.displayName = 'SubtaskList';

export default SubtaskList;