// Recursive function to find a subtask object with the given ID
// parent container can either be a data, subtask or the entire state object itself
// because it is the parent for all the tasks and subtasks
export function findSubtask(parentContainer, subTaskId) {
  // Base case, parent can either be a data or subtask
  if (parentContainer.id === subTaskId) {
    return parentContainer;
  } else {
    for (const child of parentContainer.subtasks) {
      const found = findSubtask(child, subTaskId);
      if (found) {
        return found;
      }
    }
    return null;
  }
}

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

//Recursively mark all subtasks as completed for a given data or subtask
export function markAllSubtasksCompleteForParent(parent) {
  // For each subtask of the given data:
  parent.subtasks.forEach((subtask) => {
    // Mark the subtask as completed.
    subtask.completed = true;

    // Recursively mark all subtasks of the current subtask as completed.
    if (subtask.subtasks.length > 0) {
      markAllSubtasksCompleteForParent(subtask);
    }
  });
}

export function markParentTasksAsCompleted(state, subTaskId) {
  // Find the subtask based on its ID
  const subtask = state.subtasks.find((subtask) => subtask.id === subTaskId);

  // If it is not marked as completed, do so
  if (subtask && !subtask.completed) {
    subtask.completed = true;

    // If the subtask has its own subtasks, mark all of them as completed
    const subSubtasks = state.subtasks.filter(
      (subtask) => subtask.parentId === subTaskId
    );
    if (subSubtasks.length > 0) {
      subSubtasks.forEach((subtask) => {
        subtask.completed = true;
        // Recursively mark all sub-subtasks as completed
        markParentTasksAsCompleted(state, subtask.id);
      });
    }

    // Find the subtask's parent through the parentId property
    const parent =
      subtask.parentType === "task"
        ? state.tasks.find((task) => task.id === subtask.parentId)
        : state.subtasks.find((subtask) => subtask.id === subtask.parentId);

    if (
      parent &&
      // Check if all of the parent's subtasks are completed
      state.subtasks
        .filter((subtask) => subtask.parentId === parent.id)
        .every((subtask) => subtask.completed)
    ) {
      // Recursively mark the parent task as completed
      markParentTasksAsCompleted(state, parent.id);
    }
  }
}

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
