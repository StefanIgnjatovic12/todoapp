import { writeJsonData } from "./jsonUtils";
import { tasksKey, subtasksKey } from "../data/dataSlice";

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
  const parentTask = state.tasks.find((task) => task.id === parentId);
  const subtasks = state.subtasks.filter(
    (subtask) => subtask.parentId === parentId
  );
  const updatedSubtasks = subtasks.map((subtask) => {
    const updatedSubtask = {
      ...subtask,
      completed: true,
    };
    if (state.subtasks.some((sub) => sub.parentId === subtask.id)) {
      updatedSubtask.subtasks = markAllSubtasksCompleteForParent(
        subtask.id,
        state
      ).subtasks;
    }
    return updatedSubtask;
  });

  return {
    ...parentTask,
    subtasks: updatedSubtasks,
  };
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
