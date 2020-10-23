const { Task } = require('./task.model');
const NOT_FOUND_ERROR = require('../../errors/404');

const addTask = task => Task.create(task);

const deleteBoardTasks = boardId => Task.deleteMany({ boardId });

const deleteTask = async (boardId, taskId) => {
  const task = Task.findOneAndDelete({ _id: taskId, boardId });
  if (!task) {
    throw new NOT_FOUND_ERROR('task', { taskId });
  }
};

const getBoardTasks = boardId => Task.find({ boardId });

const getTask = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId });
  if (!task) {
    throw new NOT_FOUND_ERROR('task', { taskId });
  }
  return task;
};

const unassignUserTasks = userId =>
  Task.updateMany({ userId }, { userId: null });

const updateTask = async (boardId, taskId, taskData) => {
  const task = await Task.findOneAndUpdate({ _id: taskId, boardId }, taskData);
  if (!task) {
    throw new NOT_FOUND_ERROR('task', { taskId });
  }
  return task;
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
