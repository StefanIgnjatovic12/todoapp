// Recursive function to find a subtask with the given ID
// parent container can either be a task, subtask or the entire state object itself
// because it is the parent for all the tasks and subtasks
export function findSubtask(parentContainer, subTaskId) {
  // Base case, parent can either be a task or subtask
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

//Recursively mark all subtasks as completed for a given task or subtask
export function markAllSubtasksCompleteForParent(parent) {
  // For each subtask of the given task:
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
  //find the subtask based on its id
  const subtask = findSubtask(state.tasks[0], subTaskId);
  //if it is not marked as completed, do so
  if (subtask && !subtask.completed) {
    subtask.completed = true;
    //if the subtask has its own subtasks, mark all of them as completed
    if (subtask.subtasks.length > 0) {
      markAllSubtasksCompleteForParent(subtask);
    }
    //find the subtasks parent through the parentId property
    const parentTask = findSubtask(state.tasks[0], subtask.parentId);
    if (
      parentTask &&
      //added this condition because it would automatically check parents that
      //are tasks which would defeat the purpose of having a check box next to them
      parentTask.type !== "task" &&
      //if all of the parents subtasks are completed, go again
      parentTask.subtasks.every((subtask) => subtask.completed)
    ) {
      markParentTasksAsCompleted(state, parentTask.id);
    }
  }
}

export function areAllSubtasksCompleted(task) {
  if (!task.subtasks || task.subtasks.length === 0) {
    // If the task has no subtasks, return its completion status
    return task.completed;
  } else {
    // Otherwise, check if all subtasks are completed recursively
    return task.subtasks.every((subtask) => areAllSubtasksCompleted(subtask));
  }
}
