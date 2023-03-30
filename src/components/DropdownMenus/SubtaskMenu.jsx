import React, { useState } from "react";
import Popover from "react-popover";
import "./menu.css";

export function SubtaskMenu({ handleDeleteSubtask, dispatch, subTaskId }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div>
      <Popover
        isOpen={isPopoverOpen}
        body={
          <div className="popover-body">
            <div
              className="popover-menu-options"
              onClick={() => handleDeleteSubtask(dispatch, subTaskId)}
            >
              Delete subtask
            </div>
            {/*will need to open a modal*/}
            <div className="popover-menu-options">Add subtask</div>
          </div>
        }
        preferPlace="left"
        onOuterAction={() => setIsPopoverOpen(false)}
      >
        <div
          className="dots"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        ></div>
      </Popover>
    </div>
  );
}
