export const addTask = (name) => ({
  type: "tasks/addTask",
  payload: name,
});

export const addSubtask = (parentId, name) => ({
  type: "tasks/addSubtask",
  payload: { parentId, name },
});

export const deleteTask = (taskId) => ({
  type: "tasks/deleteTask",
  payload: taskId,
});

export const deleteSubTask = (taskId, subTaskId) => ({
  type: "tasks/deleteSubTask",
  payload: { taskId, subTaskId },
});

export const markTaskAsCompleted = (taskId) => ({
  type: "tasks/markTaskAsCompleted",
  payload: taskId,
});

export const markSubtaskAsCompleted = (subTaskId) => ({
  type: "tasks/markSubtaskAsCompleted",
  payload: subTaskId,
});
