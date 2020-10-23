const tasksRepo = require('./task.mongo.repository');

const addTask = (boardId, task) => tasksRepo.addTask({ ...task, boardId });

const deleteBoardTasks = boardId => tasksRepo.deleteBoardTasks(boardId);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

const getBoardTasks = boardId => tasksRepo.getBoardTasks(boardId);

const getTask = (boardId, taskId) => tasksRepo.getTask(boardId, taskId);

const unassignUserTasks = userId => tasksRepo.unassignUserTasks(userId);

const updateTask = (boardId, taskId, task) =>
  tasksRepo.updateTask(boardId, taskId, task);

module.exports = {
  addTask,
  deleteBoardTasks,
  deleteTask,
  getBoardTasks,
  getTask,
  unassignUserTasks,
  updateTask
};
