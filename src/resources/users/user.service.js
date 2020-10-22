const tasksService = require('../tasks/task.service');
const usersRepo = require('./user.mongo.repository');
const User = require('./user.model');

const addUser = userData => {
  const user = new User(userData);
  return usersRepo.addUser(user.get());
};

const getAll = () => {
  return usersRepo.getAll();
};

const getUser = userId => usersRepo.getUser(userId);

const deleteUser = userId => {
  usersRepo.deleteUser(userId);
  tasksService.unassignUserTasks(userId);
};

const updateUser = (userData, userId) => {
  const user = usersRepo.getUser(userId);
  const editedUser = new User(user);
  editedUser.set(userData);
  return usersRepo.updateUser(editedUser.get());
};

module.exports = { addUser, deleteUser, getAll, getUser, updateUser };
