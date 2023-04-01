import React, { useState } from "react";
import ReactModal from "react-modal";
import "./addsubtaskmodal.css";
import { handleAddSubtask } from "../../redux/data/actions";
import { useDispatch } from "react-redux";

ReactModal.setAppElement("#root");
export const Modal = ({
  isOpen,
  setIsAddSubTaskModalOpen,
  parentId
}) => {
  const [subTaskName, setSubTaskName] = useState("");
  const dispatch = useDispatch();
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsAddSubTaskModalOpen(false)}
      className="modal"
      overlayClassName="overlay"
    >

      <div className="modal-content">
        <div className="subtask-add-container">
          <input
            className="subtask-add-input-field"
            type="text"
            value={subTaskName}
            onChange={(e) => setSubTaskName(e.target.value)}
          />
          <button
            className="primary-button"
            onClick={() => {
              setIsAddSubTaskModalOpen(false);
              subTaskName.length > 0 && handleAddSubtask(dispatch, parentId, subTaskName);
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
