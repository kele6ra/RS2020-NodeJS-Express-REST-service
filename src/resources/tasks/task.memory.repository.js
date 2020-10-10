let tasks = [];

const addTask = async task => {
  try {
    tasks.push(task);
    return { error: 0 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const deleteBoardTasks = async boardId => {
  try {
    tasks = tasks.filter(e => e.boardId !== boardId);
    return { error: 0 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const deleteTask = async (boardId, taskId) => {
  try {
    const taskIndex = tasks.findIndex(
      e => e.boardId === boardId && e.id === taskId
    );
    if (taskIndex >= 0) {
      tasks.splice(taskIndex, 1);
      return { error: 0 };
    }
    return { error: 1 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const getBoardTasks = async boardId => {
  try {
    return { error: 0, tasks: tasks.filter(e => e.boardId === boardId) };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const getTask = async (boardId, taskId) => {
  try {
    const taskIndex = tasks.findIndex(
      e => e.boardId === boardId && e.id === taskId
    );
    return taskIndex >= 0 ? { error: 0, task: tasks[taskIndex] } : { error: 1 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const unassignUserTasks = async userId => {
  try {
    tasks.forEach(e => {
      if (e.userId === userId) e.userId = null;
    });
    return { error: 0 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const updateTask = async (boardId, task) => {
  try {
    const taskIndex = tasks.findIndex(
      e => e.boardId === boardId && e.id === task.id
    );
    if (taskIndex >= 0) {
      tasks[taskIndex] = task;
      return { error: 0 };
    }
    return { error: 1 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
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
