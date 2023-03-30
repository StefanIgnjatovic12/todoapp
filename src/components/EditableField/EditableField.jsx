import React, { useState } from 'react';
import "../TaskList/tasklist.css"
function EditableField({ name, onSave }) {
  const [value, setValue] = useState(name);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    onSave(value);
    setEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div onClick={() => setEditing(true)}>
      {editing ? (
        <input
          className="task-edit-input-field"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="task-name">{name}</div>
      )}
    </div>
  );
}

export default EditableField;
