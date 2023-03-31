import React, { useState } from "react";
import ReactModal from "react-modal";
import "./modal.css";
import { handleAddSubtask } from "../../redux/data/actions";
import { useDispatch } from "react-redux";

ReactModal.setAppElement("#root");
export const Modal = ({
  isOpen,
  setIsAddSubTaskModalOpen,
  taskId,
  subTaskId,
}) => {
  const [subTaskName, setSubTaskName] = useState("");
  const parentId = taskId ? taskId : subTaskId;
  const dispatch = useDispatch();
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsAddSubTaskModalOpen(false)}
      className="modal"
      overlayClassName="overlay"
    >

      <div className="modal-content">
        <div className="task-add-container">
          <input
            className="task-add-input-field"
            type="text"
            value={subTaskName}
            onChange={(e) => setSubTaskName(e.target.value)}
          />
          <button
            className="primary-button"
            onClick={() => {
              setIsAddSubTaskModalOpen(false);
              handleAddSubtask(dispatch, parentId, subTaskName);
            }}
          >
            Add subtask
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
