import { combineReducers, configureStore } from "@reduxjs/toolkit";

import taskReducer from "../task/taskSlice";
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

const rootReducer = combineReducers({
  task: taskReducer,
  // TODO: Add more reducers here if needed
});

export const store = configureStore({
  reducer: rootReducer,
  testData,
});
