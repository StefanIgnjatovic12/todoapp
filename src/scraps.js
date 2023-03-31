// const handleAddTask = () => {
//   dispatch(addTask(taskName));
//   setTaskName("");
// };

// const handleAddSubtask = (taskId, subtaskName) => {
//   dispatch(addSubtask(taskId, subtaskName));
//   setSubtaskNames({ ...subtaskNames, [taskId]: "" });
// };

// const handleDeleteTask = (taskId) => {
//   dispatch(deleteTask({ taskId }));
// };
//
// const handleDeleteSubtask = (taskId, subTaskId) => {
//   dispatch(deleteSubTask(taskId, subTaskId));
// };

// const handleMarkTaskAsCompleted = (taskId) => {
//   dispatch(markTaskAsCompleted({ taskId }));
// };

// const handleMarkSubtaskAsCompleted = (subTaskId) => {
//   dispatch(markSubtaskAsCompleted({ subTaskId }));
// };
//
// const handleSubtaskNameChange = (taskId, value) => {
//   setSubtaskNames({ ...subtaskNames, [taskId]: value });
// };

//  import { getDescendantDepthInfo, hasDeepDescendants } from "./redux/utils/helperFunctions";
//
// if (subtask.collapseChildren) {
//       return { showMore: false, showLess: false };
//     }
//
//     const depthInfo = getDescendantDepthInfo(subtask.id, subtasks);
//
//     const showMore = hasDeepDescendants(subtask.id, subtasks, depthToShow);
//     // const showMore =
//     //   depthInfo.hasDeepDescendants && depthToShow <= depthInfo.maxDepth;
//
//     const showLess = true;
//     return { showMore, showLess };
//   };

//recursively makes the list of subtasks to be rendered based on the current depthToShow.
// export const getSubtasksToRender = (parentId, subtasks, depthToShow, depth) => {
//   // Get all direct children of the current parent
//   const directChildren = subtasks.filter(
//     (subtask) => subtask.parentId === parentId
//   );
//
//   // If depthToShow is reached, return an empty array to prevent rendering
//   if (depth === depthToShow) {
//     return [];
//   }
//
//   let allDescendants = [];
//   for (const child of directChildren) {
//     // Check if the current depth is within the desired range
//     if (depth >= depthToShow - 4 && depth <= depthToShow) {
//       // Add the current child to the list of all descendants
//       allDescendants.push(child);
//     }
//
//     // Recursively get all descendants of the current child
//     allDescendants = allDescendants.concat(
//       getSubtasksToRender(child.id, subtasks, depthToShow, depth + 1)
//     );
//   }
//
//   return allDescendants;
// };
//
// export const getDescendantDepthInfo = (parentId, subtasks, depthToShow = 7) => {
//   const descendants = subtasks.filter(
//     (subtask) => subtask.parentId === parentId
//   );
//   let hasDeepDescendants = false;
//   let hasDeeperSubtasks = false;
//   let maxDepth = 0;
//
//   for (const descendant of descendants) {
//     if (descendant.depth > 5) {
//       hasDeepDescendants = true;
//     }
//
//     maxDepth = Math.max(maxDepth, descendant.depth);
//
//     // Pass the depthToShow to the recursive call
//     const childDepthInfo = getDescendantDepthInfo(
//       descendant.id,
//       subtasks,
//       depthToShow
//     );
//     maxDepth = Math.max(maxDepth, childDepthInfo.maxDepth);
//
//     if (childDepthInfo.hasDeeperSubtasks) {
//       hasDeeperSubtasks = true;
//     }
//   }
//
//   // Check if there are any subtasks with a depth between depthToShow and depthToShow + 4 for the current parentId
//   if (!hasDeeperSubtasks) {
//     hasDeeperSubtasks = subtasks.some(
//       (subtask) =>
//         subtask.parentId === parentId &&
//         subtask.depth >= depthToShow &&
//         subtask.depth <= depthToShow + 4
//     );
//   }
//
//   return {
//     hasDeepDescendants,
//     hasDeeperSubtasks,
//     maxDepth,
//   };
// };
//
//
//
// export const hasDeepDescendants = (parentId, subtasks, depthToShow = 7) => {
//   const descendants = subtasks.filter(
//     (subtask) => subtask.parentId === parentId
//   );
//
//   for (const descendant of descendants) {
//     if (descendant.depth > depthToShow) {
//       return true;
//     }
//
//     if (hasDeepDescendants(descendant.id, subtasks, depthToShow)) {
//       return true;
//     }
//   }
//
//   return false;
// };
