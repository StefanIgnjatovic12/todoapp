import React, { useState } from "react";
import "./tabbuttons.css";

export function TabButtons({ setTab }) {
  const [completeButtonClicked, setCompleteButtonClicked] = useState(false);
  const [incompleteButtonClicked, setIncompleteButtonClicked] = useState(true);

  const handleCompleteClick = () => {
    setCompleteButtonClicked(true);
    setIncompleteButtonClicked(false);
    setTab("complete");
  };

  const handleIncompleteClick = () => {
    setIncompleteButtonClicked(true);
    setCompleteButtonClicked(false);
    setTab("incomplete");
  };

  return (
    <div className="task-list-tabs">
      <button
        className={`tab-button tab-button-incomplete ${
          incompleteButtonClicked ? "tab-button-clicked" : ""
        }`}
        onClick={handleIncompleteClick}
      >
        Incomplete
      </button>
      <button
        className={`tab-button tab-button-complete ${
          completeButtonClicked ? "tab-button-clicked" : ""
        }`}
        onClick={handleCompleteClick}
      >
        Completed
      </button>
    </div>
  );
}

