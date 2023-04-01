import React, { useState } from "react";
import Popover from "react-popover";
import "./menu.css";
import Modal from "../Modals/AddSubtaskModal";
import {
  handleAddSubtask,
  handleDeleteSubtask,
  handleDeleteTask,
} from "../../redux/data/actions";

export function TaskMenu({ dispatch, taskId }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isAddSubTaskModalIsOpen, setIsAddSubTaskModalOpen] = useState(false);
  const [subTaskName, setSubTaskName] = useState("");

  return (
    <div>
      {isAddSubTaskModalIsOpen && (
        <Modal
          setIsAddSubTaskModalOpen={setIsAddSubTaskModalOpen}
          isOpen={isAddSubTaskModalIsOpen}
          parentId={taskId}
        />
      )}
      <Popover
        isOpen={isPopoverOpen}
        body={
          <div className="popover-body">
            <div
              className="popover-menu-options"
              onClick={() => handleDeleteTask(dispatch, taskId)}
            >
              Delete task
            </div>
            {/*will need to open a modal*/}
            <div
              className="popover-menu-options"
              onClick={() => setIsAddSubTaskModalOpen(true)}
            >
              Add subtask
            </div>
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
