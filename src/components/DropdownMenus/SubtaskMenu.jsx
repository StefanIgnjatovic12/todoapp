import React, { useState } from "react";
import Popover from "react-popover";
import "./menu.css";
import Modal from "../Modals/AddSubtaskModal";
import { handleDeleteSubtask } from "../../redux/data/actions";
import { useDispatch } from "react-redux";

export function SubtaskMenu({ subTask }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isAddSubTaskModalIsOpen, setIsAddSubTaskModalOpen] = useState(false);

  const dispatch = useDispatch();
  return (
    <div>
      {isAddSubTaskModalIsOpen && (
        <Modal
          setIsAddSubTaskModalOpen={setIsAddSubTaskModalOpen}
          isOpen={isAddSubTaskModalIsOpen}
          parentId={subTask.id}
        />
      )}
      <Popover
        isOpen={isPopoverOpen}
        body={
          <div className="popover-body">
            <div
              className="popover-menu-options"
              onClick={() => handleDeleteSubtask(dispatch, subTask.id)}
            >
              Delete subtask
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
