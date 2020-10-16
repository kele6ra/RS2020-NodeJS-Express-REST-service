const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const addTask = (taskData, boardId) => {
  const task = new Task({ ...taskData, boardId });
  // if (
  //   typeof task.title === 'undefined' ||
  //   typeof task.order === 'undefined' ||
  //   !Number.isInteger(task.order) ||
  //   typeof task.boardId === 'undefined'
  // ) {
  //   return { code: 400 };
  // }
  return tasksRepo.addTask(task.get());
};

const deleteBoardTasks = boardId => tasksRepo.deleteBoardTasks(boardId);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

const getBoardTasks = boardId => tasksRepo.getBoardTasks(boardId);

const getTask = (boardId, taskId) => tasksRepo.getTask(boardId, taskId);

const unassignUserTasks = userId => tasksRepo.unassignUserTasks(userId);

const updateTask = async (boardId, taskId, taskData) => {
  const task = await tasksRepo.getTask(boardId, taskId);
  const editedTask = new Task(task);
  editedTask.set(taskData);
  // if (
  //   typeof task.order === 'undefined' ||
  //   !Number.isInteger(task.order) ||
  //   typeof task.boardId === 'undefined'
  // ) {
  //   return { code: 400 };
  // }
  return await tasksRepo.updateTask(boardId, editedTask.get());
};

module.exports = {
  addTask,
  deleteBoardTasks,
  deleteTask,
  getBoardTasks,
  getTask,
  unassignUserTasks,
  updateTask
};
