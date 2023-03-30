import { createSlice } from "@reduxjs/toolkit";
import { writeJsonData } from "../utils/jsonUtils";
import {
  areAllSubtasksCompleted,
  markAllSubtasksCompleteForParent,
  findSubtask,
  markParentTasksAsCompleted,
  findTaskOrSubtaskById,
} from "../utils/helperFunctions";
import { v4 as uuidv4 } from "uuid";

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

const tasksKey = "tasks";

// const initialState = {
//   tasks: [],
// };

const dataSlice = createSlice({
  name: "data", // initialState: readJsonData(tasksKey) || initialState,
  initialState: testData,
  reducers: {
    addTask: (state, action) => {
      try {
        const newTask = {
          id: uuidv4(),
          name: action.payload,
          completed: false,
          type: "task",
          createdOn: new Date(),
          subtasks: [],
        };
        state.tasks = [newTask, ...state.tasks];
        writeJsonData(tasksKey, state);
      } catch (error) {
        console.log("Error while adding task: ", error);
      }
    },
    addSubtask: (state, action) => {
      try {
        const { parentId, name } = action.payload;
        //check if parent is a data or another subtask
        const parent = findTaskOrSubtaskById(parentId, state);
        if (parent) {
          const newSubtask = {
            id: uuidv4(),
            name,
            completed: false,
            type: "subtask",
            parentId: parent.id,
            parentType: parent.type,
            createdOn: new Date(),
            subtasks: [],
          };
          state.subtasks = [newSubtask, ...state.subtasks];
          writeJsonData(tasksKey, state);
        }
      } catch (error) {
        console.log("Error while adding subtask: ", error);
      }
    },
    editTaskName: (state, action) => {
      try {
        const { taskId, newName } = action.payload;
        const task = findTaskOrSubtaskById(taskId, state);
        if (task) {
          task.name = newName;
          writeJsonData(tasksKey, state);
        }
      } catch (error) {
        console.log("Error while editing task name: ", error);
      }
    },

    editSubtaskName: (state, action) => {
      try {
        const { subtaskId, name } = action.payload;
        const subtask = findTaskOrSubtaskById(subtaskId, state);
        if (subtask) {
          subtask.name = name;
          writeJsonData(tasksKey, state);
        }
      } catch (error) {
        console.log("Error while editing subtask name: ", error);
      }
    },

    deleteTask: (state, action) => {
      try {
        const { taskId } = action.payload;
        state.tasks = state.tasks.filter((task) => task.id !== taskId);
        writeJsonData(tasksKey, state);
      } catch (error) {
        console.log("Error while deleting task: ", error);
      }
    },
    deleteSubTask: (state, action) => {
      try {
        const { subTaskId } = action.payload;
        state.subtasks = state.subtasks.filter(
          (subtask) => subtask.id !== subTaskId
        );
        writeJsonData(tasksKey, state);
      } catch (error) {
        console.log("Error while deleting subtask: ", error);
      }
    },
    markTaskAsCompleted: (state, action) => {
      try {
        // Find the data by ID and mark it as completed
        const { taskId } = action.payload;
        const task = state.tasks.find((task) => task.id === taskId);
        //check if all of the subtasks are completed
        if (!task.completed && areAllSubtasksCompleted(task, state.subtasks)) {
          //mark the data as completed
          task.completed = true;
          //Recursively mark all of the tasks subtasks as completed
          // markAllSubtasksCompleteForParent(data);
          writeJsonData(tasksKey, state);
        }
      } catch (error) {
        console.log("Error while marking task as completed: ", error);
      }
    },
    markTaskAsNotCompleted: (state, action) => {
      try {
        const { taskId } = action.payload;
        const task = state.tasks.find((task) => task.id === taskId);
        if (task.completed) {
          task.completed = false;
          writeJsonData(tasksKey, state);
        }
      } catch (error) {
        console.log("Error while marking task as not completed: ", error);
      }
    },
    // Reducer function to mark a subtask as completed
    markSubtaskAsCompleted: (state, action) => {
      try {
        // Extract the IDs of the subtask and its parent data
        const { subTaskId } = action.payload;
        // Mark all parent tasks as completed if necessary
        markParentTasksAsCompleted(state, subTaskId);

        // Save updated state to localStorage
        writeJsonData(tasksKey, state);
      } catch (error) {
        console.error("Error marking subtask as completed: ", error);
      }
    }, // Reducer function to mark a subtask as not completed
    markSubtaskAsNotCompleted: (state, action) => {
      try {
        const { subTaskId } = action.payload;
        const subtask = state.subtasks.find(
          (subtask) => subtask.id === subTaskId
        );
        if (subtask) {
          subtask.completed = false;
          writeJsonData(tasksKey, state);
        }
      } catch (error) {
        console.error("Error marking subtask as not completed: ", error);
      }
    },
  },
  extraReducers: {
    // Handle extra reducers here, such as fetching tasks from an API
  },
});

export default dataSlice.reducer;

export const selectTasks = (state) => state.data.tasks;
export const selectSubtasks = (state) => state.data.subtasks;
