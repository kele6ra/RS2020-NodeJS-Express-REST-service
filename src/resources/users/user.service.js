const tasksService = require('../tasks/task.service');
const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const addUser = async userData => {
  const user = new User(userData);
  if (typeof user.name === 'undefined') return { code: 400 };
  const { error } = await usersRepo.addUser(user.get());
  return error ? { code: 400 } : { code: 200, user: user.toResponce() };
};

const getAll = async () => {
  const { error, users } = await usersRepo.getAll();
  return error
    ? { code: 400 }
    : { code: 200, users: users.map(e => new User(e).toResponce()) };
};

const getUser = async userId => {
  const { error, user } = await usersRepo.getUser(userId);
  return error
    ? { code: error === 1 ? 404 : 400 }
    : { code: 200, user: new User(user).toResponce() };
};

const deleteUser = async userId => {
  const { error } = await usersRepo.deleteUser(userId);
  if (error === 0) await tasksService.unassignUserTasks(userId);
  return error ? { code: error === 1 ? 404 : 400 } : { code: 204 };
};

const updateUser = async (userData, userId) => {
  const { getError, user } = await usersRepo.getUser(userId);
  if (getError === 1) return { code: 404 };
  const editedUser = new User(user);
  editedUser.set(userData);
  if (typeof editedUser.name === 'undefined') return { code: 400 };
  const result = await usersRepo.updateUser(editedUser.get());
  return result.error
    ? { code: result.error === 1 ? 404 : 400 }
    : { code: 200, user: editedUser.toResponce() };
};

module.exports = { addUser, deleteUser, getAll, getUser, updateUser };
