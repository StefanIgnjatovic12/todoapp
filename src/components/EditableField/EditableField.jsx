import React, { useState } from "react";
import "./editablefield.css";
import { shades } from "../../redux/utils/helperFunctions";

function EditableField({ name, onSave, parentType, depth }) {
  const [value, setValue] = useState(name);
  const [editing, setEditing] = useState(false);
  console.log(depth);
  const handleSave = () => {
    value.length > 0 && onSave(value);
    setEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div
      className="edit-input-field-container"
      onClick={() => setEditing(true)}
    >
      {editing ? (
        <input
          autoFocus={true}
          style={{ color: shades[depth - 2] }}
          className="edit-input-field"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div
          className={parentType === "task" ? "task-name" : "subtask-name"}
          style={{ color: shades[depth - 2] }}
        >
          {name}
        </div>
      )}
    </div>
  );
}

export default EditableField;
