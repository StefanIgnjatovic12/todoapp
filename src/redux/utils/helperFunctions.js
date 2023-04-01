import React from "react";
import { writeJsonData } from "./jsonUtils";
import { tasksKey, subtasksKey } from "../data/dataSlice";
import tinycolor from "tinycolor2";

export function findTaskOrSubtaskById(id, data) {
  const task = data.tasks.find((task) => task.id === id);
  if (task) {
    return task;
  }
  const subtask = data.subtasks.find((subtask) => subtask.id === id);
  if (subtask) {
    return subtask;
  }
  return null; // return null if task or subtask with the given ID is not found
}

function getParent(state, subtask) {
  return subtask.parentType === "task"
    ? state.tasks.find((task) => task.id === subtask.parentId)
    : state.subtasks.find((subtask) => subtask.id === subtask.parentId);
}

export function markAllSubtasksCompleteForParent(parentId, state) {
  // Create a set to store the IDs of the completed parent task and the subtasks/nestedsubtasks,
  let completedSubtaskIds = new Set([parentId]);

  // Used to keep track while we're iterating
  let noSubtasksUpdated;

  // Make a copy of the state's subtasks
  let updatedSubtasks = [...state.subtasks];

  // Continue updating subtasks until no more changes are made
  do {
    // Set noSubtasksUpdated to true, assuming no subtasks will be updated in this iteration
    noSubtasksUpdated = true;

    // Iterate through each subtask
    updatedSubtasks = updatedSubtasks.map((subtask) => {
      // If the subtask's parentId is in the completedSubtaskIds set and the subtask is not completed yet
      if (completedSubtaskIds.has(subtask.parentId) && !subtask.completed) {
        // Set subtasksUpdated to false, indicating that a subtask has been updated in this iteration
        noSubtasksUpdated = false;

        // Add the subtask ID to the completedSubtaskIds set
        completedSubtaskIds.add(subtask.id);

        // Return the updated subtask with the completed status set to true
        return { ...subtask, completed: true };
      }

      // Return the unchanged subtask
      return subtask;
    });
  } while (!noSubtasksUpdated); // Continue updating subtasks until no more changes are made > if !noSubtasksUpdated
  // = true, continue the loop

  // Write the updated subtasks to local storage
  writeJsonData(subtasksKey, updatedSubtasks);

  // Return the updated subtasks
  return updatedSubtasks;
}

export function deleteAllSubtasksForParent(parentId, state) {
  let subtaskIdsToProcess = new Set([parentId]);
  let subtasksToProcessFound;
  let updatedSubtasks = [...state.subtasks];
  do {
    subtasksToProcessFound = false;
    updatedSubtasks = updatedSubtasks.filter((subtask) => {
      if (subtaskIdsToProcess.has(subtask.parentId)) {
        subtasksToProcessFound = true;
        subtaskIdsToProcess.add(subtask.id);

        // If the subtask is not the parent task, delete it from the updatedSubtasks array
        if (subtask.id !== parentId) {
          return false;
        }
      }
      // Return the unchanged subtask
      return subtask;
    });
  } while (subtasksToProcessFound);

  return updatedSubtasks;
}

export const updateDescendantsCollapse = (subtasks, subTaskId) => {
  return subtasks.map((subtask) => {
    // Check if the subtask is a descendant of the target subtask and its collapseChildren property is false
    if (subtask.parentId === subTaskId && !subtask.collapseChildren) {
      // Update the `collapseChildren` property to true for the current descendant subtask.
      const updatedSubtask = {
        ...subtask,
        collapseChildren: true,
      };
      // Recursively update the `collapseChildren` property for further descendants.
      const updatedDescendants = updateDescendantsCollapse(
        subtasks,
        updatedSubtask.id
      );
      return { ...updatedSubtask, ...updatedDescendants };
    }
    return subtask;
  });
};

// export function markParentTasksAsCompleted(state, subTaskId) {
//   const subtask = state.subtasks.find((subtask) => subtask.id === subTaskId);
//
//
//   if (subtask && !subtask.completed) {
//     const updatedSubtasks = state.subtasks.map((subtask) =>
//       subtask.parentId === subTaskId ? { ...subtask, completed: true } : subtask
//     );
//     const parent = getParent(state, subtask);
//     if (parent && areAllSubtasksCompleted(parent, state.subtasks)) {
//       markParentTasksAsCompleted(state, parent.id);
//     }
//     writeJsonData(tasksKey, { ...state, tasks: updatedTasks });
//     writeJsonData(subtasksKey, { ...state, subtasks: updatedSubtasks });
//   }
//   const parent = getParent(state, subtask);
// }

export function areAllSubtasksCompleted(task, subtasks) {
  const taskSubtasks = subtasks.filter(
    (subtask) => subtask.parentId === task.id
  );

  if (!taskSubtasks || taskSubtasks.length === 0) {
    // If the task has no subtasks, return its completion status
    return task.completed;
  } else {
    // Otherwise, check if all subtasks are completed recursively
    return taskSubtasks.every((subtask) =>
      areAllSubtasksCompleted(subtask, subtasks)
    );
  }
}

export function getIndentation(level) {
  const indentationValues = [
    0, 0.25, 0.5, 0.5625, 0.625, 0.6875, 0.75, 0.8125, 0.875, 0.9375, 1, 1.0625,
    1.125, 1.1875, 1.25, 1.3125, 1.375, 1.4375, 1.5, 1.5625, 1.625, 1.6875,
    1.75, 1.8125, 1.875, 1.9375, 2,
  ];

  if (level < indentationValues.length) {
    return `${indentationValues[level]}rem`;
  }
  // For levels beyond the defined values, use the last value in the array
  return `${indentationValues[indentationValues.length - 1]}rem`;
}

export function generateShades(color, numShades) {
  const baseColor = tinycolor(color);
  const hueStep = 360 / (numShades * 2); // Rotate hue by smaller steps
  const blendStep = 1 / (numShades * 2); // Blend by smaller steps

  const shades = [];

  for (let i = 1; i < numShades; i++) {
    const hueShiftedColor = baseColor.spin(i * hueStep);
    const shade = tinycolor
      .mix(hueShiftedColor, "#ffffff", i * blendStep * 100)
      .toHexString();
    shades.push(shade);
  }

  return shades;
}

export const shades = generateShades("#79F2D7", 10);

export const hasDescendantWithDepthGreaterThanOrEqualTo = (
  parentId,
  threshold,
  subtasks
) => {
  const checkSubtasks = (id) => {
    const children = subtasks.filter((subtask) => subtask.parentId === id);
    for (const child of children) {
      if (child.depth >= threshold && !child.collapseChildren) {
        return true;
      }
      if (checkSubtasks(child.id)) {
        return true;
      }
    }
    return false;
  };
  return checkSubtasks(parentId);
};


export const hasChildren = (subTaskId, subtasks) => {
  return subtasks.some((subtask) => subtask.parentId === subTaskId);
}


export const renderIcon = (subtask, subtasks, depth) => {
  const icon = subtask.collapseChildren ? "▼" : "▲";
  const hasChildren = subtasks.some((s) => s.parentId === subtask.id);
  const color = shades[depth - 2];
  return <div style={{ color }}>{hasChildren ? icon : "▼"}</div>;
};
