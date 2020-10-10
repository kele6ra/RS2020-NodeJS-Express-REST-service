const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const addTask = async (taskData, boardId) => {
  const task = new Task({ ...taskData, boardId });
  if (
    typeof task.title === 'undefined' ||
    typeof task.order === 'undefined' ||
    !Number.isInteger(task.order) ||
    typeof task.boardId === 'undefined'
  ) {
    return { code: 400 };
  }
  const { error } = await tasksRepo.addTask(task.get());
  return error ? { code: 400 } : { code: 200, task: task.toResponce() };
};

const deleteBoardTasks = async boardId =>
  await tasksRepo.deleteBoardTasks(boardId);

const deleteTask = async (boardId, taskId) => {
  const { error } = await tasksRepo.deleteTask(boardId, taskId);
  return error ? { code: error === 1 ? 404 : 400 } : { code: 204 };
};

const getBoardTasks = async boardId => {
  const { error, tasks } = await tasksRepo.getBoardTasks(boardId);
  return error
    ? { code: 400 }
    : { code: 200, tasks: tasks.map(e => new Task(e).toResponce()) };
};

const getTask = async (boardId, taskId) => {
  const { error, task } = await tasksRepo.getTask(boardId, taskId);
  return error
    ? { code: error === 1 ? 404 : 400 }
    : { code: 200, task: new Task(task).toResponce() };
};

const unassignUserTasks = async userId =>
  await tasksRepo.unassignUserTasks(userId);

const updateTask = async (boardId, taskId, taskData) => {
  const { error, task } = await tasksRepo.getTask(boardId, taskId);
  if (error === 1) return { code: 404 };
  const editedTask = new Task(task);
  editedTask.set(taskData);
  if (
    typeof task.order === 'undefined' ||
    !Number.isInteger(task.order) ||
    typeof task.boardId === 'undefined'
  ) {
    return { code: 400 };
  }
  const result = await tasksRepo.updateTask(boardId, editedTask.get());
  return result.error
    ? { code: result.error === 1 ? 404 : 400 }
    : { code: 200, task: editedTask.toResponce() };
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
