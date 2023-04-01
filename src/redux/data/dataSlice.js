import { createSlice } from "@reduxjs/toolkit";
import { writeJsonData, readJsonData } from "../utils/jsonUtils";
import {
  markAllSubtasksCompleteForParent,
  findTaskOrSubtaskById,
  updateDescendantsCollapse,
  deleteAllSubtasksForParent,
} from "../utils/helperFunctions";
import { v4 as uuidv4 } from "uuid";

export const tasksKey = "tasks";
export const subtasksKey = "subtasks";

const savedState = {
  tasks: readJsonData(tasksKey),
  subtasks: readJsonData(subtasksKey),
};
const initialState = {
  tasks: [],
  subtasks: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState: savedState || initialState,
  reducers: {
    addTask: (state, action) => {
      const createdOn = new Date().toLocaleString("en-US", { hour12: false });
      const newTask = {
        id: uuidv4(),
        name: action.payload,
        completed: false,
        type: "task",
        createdOn: createdOn,
        depth: 1,
      };
      const newTasks =
        state && state.tasks && state.tasks.length > 0
          ? [newTask, ...state.tasks]
          : [newTask];

      const newState = { ...state, tasks: newTasks };
      writeJsonData(tasksKey, newState);
      return newState;
    },
    addSubtask: (state, action) => {
      const createdOn = new Date().toLocaleString("en-US", { hour12: false });
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
          collapseChildren: true,
          createdOn: createdOn,
          depth: parent.depth + 1,
        };
        const newSubtasks =
          state && state.subtasks && state.subtasks.length > 0
            ? [newSubtask, ...state.subtasks]
            : [newSubtask];

        const newState = { ...state, subtasks: newSubtasks };
        writeJsonData(subtasksKey, newState);

        if (parent.type === "subtask") {
          const updatedParent = { ...parent, collapseChildren: false };
          const updatedSubtasks = newState.subtasks.map((subtask) =>
            subtask.id === updatedParent.id ? updatedParent : subtask
          );
          const updatedState = { ...newState, subtasks: updatedSubtasks };
          writeJsonData(subtasksKey, updatedSubtasks);
          return updatedState;
        }

        return newState;
      }
    },
    editTaskName: (state, action) => {
      const { taskId, newName } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        const updatedTasks = state.tasks.map((task) =>
          task.id === taskId ? { ...task, name: newName } : task
        );
        writeJsonData(tasksKey, updatedTasks);
        return { ...state, tasks: updatedTasks };
      }
    },

    editSubtaskName: (state, action) => {
      const { subtaskId, newName } = action.payload;
      const subtask = state.subtasks.find(
        (subtask) => subtask.id === subtaskId
      );
      if (subtask) {
        const updatedSubtasks = state.subtasks.map((subtask) =>
          subtask.id === subtaskId ? { ...subtask, name: newName } : subtask
        );
        writeJsonData(subtasksKey, updatedSubtasks);
        return { ...state, subtasks: updatedSubtasks };
      }
    },

    deleteTask: (state, action) => {
      const { taskId } = action.payload;
      const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
      const updatedSubtasks = deleteAllSubtasksForParent(taskId, state);
      writeJsonData(tasksKey, updatedTasks);
      writeJsonData(subtasksKey, updatedSubtasks);
      return { ...state, tasks: updatedTasks, subtasks: updatedSubtasks };
    },

    deleteSubTask: (state, action) => {
      const { subTaskId } = action.payload;
      //delete the subtasks descendents
      const updatedSubtasksForParent = deleteAllSubtasksForParent(
        subTaskId,
        state
      );
      const updatedSubtasks = updatedSubtasksForParent.filter(
        (subtask) => subtask.id !== subTaskId
      );
      writeJsonData(subtasksKey, updatedSubtasks);
      return { ...state, subtasks: updatedSubtasks };
    },

    markTaskAsCompleted: (state, action) => {
      const { taskId } = action.payload;
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      );
      const updatedSubtasks = markAllSubtasksCompleteForParent(taskId, state);
      writeJsonData(tasksKey, updatedTasks);
      return { ...state, tasks: updatedTasks, subtasks: updatedSubtasks };
    },

    markTaskAsNotCompleted: (state, action) => {
      const { taskId } = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: false };
        }
        return task;
      });
      writeJsonData(tasksKey, updatedTasks);
      return { ...state, tasks: updatedTasks };
    },

    // Reducer function to mark a subtask as completed
    markSubtaskAsCompleted: (state, action) => {
      // Extract the IDs of the subtask and its parent data
      const { subTaskId } = action.payload;
      // Mark all parent tasks as completed if necessary and write to local storage
      const subtask = state.subtasks.find(
        (subtask) => subtask.id === subTaskId
      );

      if (subtask && !subtask.completed) {
        const updatedSubtasks = state.subtasks.map((subtask) =>
          subtask.id === subTaskId ? { ...subtask, completed: true } : subtask
        );

        writeJsonData(subtasksKey, updatedSubtasks);
        return { ...state, subtasks: updatedSubtasks };
      }
    },

    // Reducer function to mark a subtask as not completed
    markSubtaskAsNotCompleted: (state, action) => {
      const { subTaskId } = action.payload;
      const updatedSubtasks = state.subtasks.map((subtask) => {
        if (subtask.id === subTaskId) {
          return { ...subtask, completed: false };
        }
        return subtask;
      });
      writeJsonData(subtasksKey, updatedSubtasks);
      return { ...state, subtasks: updatedSubtasks };
    },

    toggleSubtaskIsCollapsed: (state, action) => {
      const { subTaskId } = action.payload;
      // Update the `collapseChildren` property of the target subtask.
      const updatedSubtasks = state.subtasks.map((subtask) => {
        if (subtask.id === subTaskId) {
          return { ...subtask, collapseChildren: !subtask.collapseChildren };
        }
        return subtask;
      });

      // Find the target subtask in the updated subtasks array.
      const targetSubtask = updatedSubtasks.find(
        (subtask) => subtask.id === subTaskId
      );
      // Update the descendants' `collapseChildren` properties only if the target subtask's property changed from false to true.
      const finalSubtasks = targetSubtask.collapseChildren
        ? updateDescendantsCollapse(updatedSubtasks, subTaskId)
        : updatedSubtasks;

      // Update the state with the final subtasks array.
      writeJsonData(subtasksKey, finalSubtasks);
      return { ...state, subtasks: finalSubtasks };
    },
  },
  extraReducers: {},
});

export default dataSlice.reducer;

export const selectTasks = (state) => state.data.tasks;
export const selectSubtasks = (state) => state.data.subtasks;
