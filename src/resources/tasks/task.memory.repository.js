const NOT_FOUND_ERROR = require('../../errors/404');
let tasks = [];

const addTask = task => {
  tasks.push(task);
  return task;
};

const deleteBoardTasks = boardId => {
  tasks = tasks.filter(e => e.boardId !== boardId);
};

const deleteTask = (boardId, taskId) => {
  const taskIndex = tasks.findIndex(
    e => e.boardId === boardId && e.id === taskId
  );
  if (taskIndex === -1) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find task with id: ${taskId} on board with id: ${boardId}`
    );
  }
  tasks.splice(taskIndex, 1);
};

const getBoardTasks = boardId => tasks.filter(e => e.boardId === boardId);

const getTask = async (boardId, taskId) => {
  const taskIndex = tasks.findIndex(
    e => e.boardId === boardId && e.id === taskId
  );
  if (taskIndex === -1) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find task with id: ${taskId} on board with id: ${boardId}`
    );
  }
  return tasks[taskIndex];
};

const unassignUserTasks = userId => {
  tasks.forEach(e => {
    if (e.userId === userId) e.userId = null;
  });
};

const updateTask = (boardId, task) => {
  const taskIndex = tasks.findIndex(
    e => e.boardId === boardId && e.id === task.id
  );
  if (taskIndex === -1) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find task with id: ${task.id} on board with id: ${boardId}`
    );
  }
  tasks[taskIndex] = task;
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
