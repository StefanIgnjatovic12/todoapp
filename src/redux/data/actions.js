//Add a task
export const addTask = (name) => ({
  type: "data/addTask",
  payload: name,
});

export const handleAddTask = (dispatch, taskName, setTaskName) => {
  dispatch(addTask(taskName));
  setTaskName("");
};

//Add a subtask
export const addSubtask = (parentId, name) => ({
  type: "data/addSubtask",
  payload: { parentId, name },
});

export const handleAddSubtask = (dispatch, parentId, subtaskName) => {
  dispatch(addSubtask(parentId, subtaskName));
};

//Delete a task
export const deleteTask = (taskId) => ({
  type: "data/deleteTask",
  payload: { taskId },
});

export const handleDeleteTask = (dispatch, taskId) => {
  dispatch(deleteTask(taskId));
};

//Delete a subtask
export const deleteSubTask = (subTaskId) => ({
  type: "data/deleteSubTask",
  payload: { subTaskId },
});

export const handleDeleteSubtask = (dispatch, subTaskId) => {
  dispatch(deleteSubTask(subTaskId));
};

//Edit a task
export const editTaskName = (taskId, newName) => ({
  type: "data/editTaskName",
  payload: { taskId, newName },
});

export const handleEditTaskName = (dispatch, taskId, newName) => {
  dispatch(editTaskName(taskId, newName));
};

//Edit a subtask
export const editSubtaskName = (subtaskId, newName) => ({
  type: "data/editSubtaskName",
  payload: { subtaskId, newName },
});

export const handleEditSubtaskName = (dispatch, subtaskId, newName) => {
  dispatch(editSubtaskName(subtaskId, newName));
};

//Mark a task as completed
export const markTaskAsCompleted = (taskId) => ({
  type: "data/markTaskAsCompleted",
  payload: { taskId },
});

export const handleMarkTaskAsCompleted = (dispatch, taskId) => {
  dispatch(markTaskAsCompleted(taskId));
};

//Mark a task as not completed
export const markTaskAsNotCompleted = (taskId) => ({
  type: "data/markTaskAsNotCompleted",
  payload: { taskId },
});

export const handleMarkTaskAsNotCompleted = (dispatch, taskId) => {
  dispatch(markTaskAsNotCompleted(taskId));
};

//Mark a subtask as completed
export const markSubtaskAsCompleted = (subTaskId) => ({
  type: "data/markSubtaskAsCompleted",
  payload: { subTaskId },
});

export const handleMarkSubtaskAsCompleted = (dispatch, subTaskId) => {
  dispatch(markSubtaskAsCompleted(subTaskId));
};

//Mark a subtask as not completed
export const markSubtaskAsNotCompleted = (subTaskId) => ({
  type: "data/markSubtaskAsNotCompleted",
  payload: { subTaskId },
});

export const handleMarkSubtaskAsNotCompleted = (dispatch, subTaskId) => {
  dispatch(markSubtaskAsNotCompleted(subTaskId));
};

//Toggle if subtask is collapseChildren
export const toggleSubtaskIsCollapsed = (subTaskId) => ({
  type: "data/toggleSubtaskIsCollapsed",
  payload: { subTaskId },
});

export const handleToggleSubtaskIsCollapsed = (dispatch, subTaskId) => {
  dispatch(toggleSubtaskIsCollapsed(subTaskId));
};
