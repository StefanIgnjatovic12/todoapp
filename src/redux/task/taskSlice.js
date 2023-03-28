import { createSlice } from "@reduxjs/toolkit";
import { writeJsonData } from "../utils/jsonUtils";
import {
  areAllSubtasksCompleted,
  markAllSubtasksCompleteForParent,
  findSubtask,
  markParentTasksAsCompleted,
} from "../utils/helperFunctions";
import { v4 as uuidv4 } from "uuid";

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
const tasksKey = "tasks";

// const initialState = {
//   tasks: [],
// };

const tasksSlice = createSlice({
  name: "tasks",
  // initialState: readJsonData(tasksKey) || initialState,
  initialState: testData,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: uuidv4(),
        name: action.payload,
        completed: false,
        type: "task",
        subtasks: [],
      };
      state.tasks.push(newTask);
      writeJsonData(tasksKey, state);
    },
    addSubtask: (state, action) => {
      const { parentId, name } = action.payload;
      //check if parent is a task or another subtask
      const parent =
        state.tasks.find((task) => task.id === parentId) ||
        findSubtask(state.tasks[0], parentId);
      if (parent) {
        const newSubtask = {
          id: uuidv4(),
          name,
          completed: false,
          type: "subtask",
          parentId: parent.id,
          parentType: parent.type,
          subtasks: [],
        };
        parent.subtasks = [newSubtask, ...parent.subtasks];
        writeJsonData(tasksKey, state);
      }
    },
    deleteTask: (state, action) => {
      const { taskId } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      writeJsonData(tasksKey, state);
    },
    deleteSubTask: (state, action) => {
      const { taskId, subTaskId } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      task.subtasks = task.subtasks.filter(
        (subtask) => subtask.id !== subTaskId
      );
      writeJsonData(tasksKey, state);
    },
    markTaskAsCompleted: (state, action) => {
      // Find the task by ID and mark it as completed
      const { taskId } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      //check if all of the subtasks are completed
      if (task && areAllSubtasksCompleted(task)) {
        //mark the task as completed
        task.completed = true;
        //Recursively mark all of the tasks subtasks as completed
        // markAllSubtasksCompleteForParent(task);
        writeJsonData(tasksKey, state);
      }
    },

    // Reducer function to mark a subtask as completed
    markSubtaskAsCompleted: (state, action) => {
      // Extract the IDs of the subtask and its parent task
      const { subTaskId } = action.payload;
      // Mark all parent tasks as completed if necessary
      markParentTasksAsCompleted(state, subTaskId);

      // Save updated state to localStorage
      writeJsonData(tasksKey, state);
    },
  },
  extraReducers: {
    // Handle extra reducers here, such as fetching tasks from an API
  },
});

export default tasksSlice.reducer;
export const { addTask, addSubtask, markTaskAsCompleted, deleteTask } =
  tasksSlice.actions;

// export const selectState = (state) => state.task;
export const selectTasks = (state) => state.task.tasks;
