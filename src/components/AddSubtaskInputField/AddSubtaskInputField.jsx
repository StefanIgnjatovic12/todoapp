import { handleAddSubtask } from "../../redux/data/actions";
import { useState } from "react";
import React from "react";

export function AddSubtaskInputField({ parentId, dispatch }) {
  const [subtaskName, setSubtaskName] = useState("");

  const handleSubtaskInputChange = (e) => {
    const value = e.target.value;
    setSubtaskName(value);
  };

  const handleAddSubtaskButtonClick = () => {
    handleAddSubtask(dispatch, parentId, subtaskName);
    setSubtaskName("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder={`Add subtask for ${parentId}`}
        value={subtaskName}
        onChange={handleSubtaskInputChange}
      />
      <button className="primary-button" onClick={handleAddSubtaskButtonClick}>Add subtask</button>
    </div>
  );
}
