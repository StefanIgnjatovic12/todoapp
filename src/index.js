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
      subtasks: [
        {
          id: "subtask1",
          name: "Subtask 1",
          type: "subtask",
          completed: false,
          parentId: "task1",
          parentType: "task",
          subtasks: [
            {
              id: "subtask1-1",
              name: "Subtask 1-1",
              type: "subtask",
              completed: false,
              parentId: "subtask1",
              parentType: "subtask",
              subtasks: [],
            },
          ],
        },
        {
          id: "subtask2",
          name: "Subtask 2",
          type: "subtask",
          completed: false,
          parentId: "task1",
          parentType: "task",
          subtasks: [
            {
              id: "subtask2-1",
              name: "Subtask 2-1",
              type: "subtask",
              completed: false,
              parentId: "subtask2",
              parentType: "subtask",
              subtasks: [],
            },
          ],
        },
      ],
    },
    {
      id: "task2",
      name: "Task 2",
      type: "task",
      completed: false,
      subtasks: [
        {
          id: "subtask3",
          name: "Subtask 3",
          type: "subtask",
          completed: false,
          parentId: "task2",
          parentType: "task",
          subtasks: [
            {
              id: "subtask3-1",
              name: "Subtask 3-1",
              type: "subtask",
              completed: false,
              parentId: "subtask3",
              parentType: "subtask",
              subtasks: [],
            },
          ],
        },
        {
          id: "subtask4",
          name: "Subtask 4",
          type: "subtask",
          completed: false,
          parentId: "task2",
          parentType: "task",
          subtasks: [
            {
              id: "subtask4-1",
              name: "Subtask 4-1",
              type: "subtask",
              completed: false,
              parentId: "subtask4",
              parentType: "subtask",
              subtasks: [],
            },
          ],
        },
      ],
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
