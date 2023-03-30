import { combineReducers, configureStore } from "@reduxjs/toolkit";

import dataReducer from "../data/dataSlice";
import { readJsonData } from "../utils/jsonUtils";

const tasksKey = "tasks";
// const preloadedState = readJsonData(tasksKey) || {
//   tasks: [],
//   subtasks: [],
//   // ...
// };

const testData = {
  tasks: [
    {
      id: "task1",
      name: "Task 1",
      type: "task",
      completed: false,
      createdOn: "2023-01-01T10:30:00.000Z",
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

const rootReducer = combineReducers({
  data: dataReducer,
  // TODO: Add more reducers here if needed
});

export const store = configureStore({
  reducer: rootReducer,
  testData,
});
