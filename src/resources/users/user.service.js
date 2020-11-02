const usersRepo = require('./user.mongo.repository');
const taskService = require('../tasks/task.service');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../common/config');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const getUserByLogin = login => usersRepo.getUserByLogin(login);

const deleteUser = async id => {
  await usersRepo.deleteUser(id);
  await taskService.unassignUserTasks(id);
};

const addUser = async user => {
  const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
  return await usersRepo.addUser({ ...user, password: hash });
};

const updateUser = async (id, user) => {
  const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
  const updatedUser = await usersRepo.updateUser(id, {
    ...user,
    password: hash
  });
  return updatedUser;
};

module.exports = {
  getAll,
  getUser,
  getUserByLogin,
  deleteUser,
  addUser,
  updateUser
};
