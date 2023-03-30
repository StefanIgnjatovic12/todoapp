import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { writeJsonData } from "./redux/utils/jsonUtils";

const testData = {
  tasks: [
    {
      id: "task1",
      name: "Task 1",
      type: "task",
      completed: false,
      createdOn: "2023-01-01T10:30:00.000Z",
    },
    {
      id: "task2",
      name: "Task 2",
      type: "task",
      completed: false,
      createdOn: "2023-01-05T10:30:00.000Z",
    },
  ],
  subtasks: [
    {
      id: "subtask1",
      name: "Subtask 1",
      type: "subtask",
      completed: false,
      parentId: "task1",
      parentType: "task",
      createdOn: "2023-01-02T10:30:00.000Z",
    },
    {
      id: "subtask1-1",
      name: "Subtask 1-1",
      type: "subtask",
      completed: false,
      parentId: "subtask1",
      parentType: "subtask",
      createdOn: "2023-01-03T10:30:00.000Z",
    },
    {
      id: "subtask2",
      name: "Subtask 2",
      type: "subtask",
      completed: false,
      parentId: "task1",
      parentType: "task",
      createdOn: "2023-01-04T10:30:00.000Z",
    },
    {
      id: "subtask2-1",
      name: "Subtask 2-1",
      type: "subtask",
      completed: false,
      parentId: "subtask2",
      parentType: "subtask",
      createdOn: "2023-01-05T10:30:00.000Z",
    },
  ],
};



// const initialState = {
//   tasks: [{ subtasks: [] }],
// };
const tasksKey = "tasks";
// writeJsonData(tasksKey, initialState);

writeJsonData(tasksKey, testData);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
