const usersRepo = require('./user.mongo.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const deleteUser = async id => {
  await usersRepo.deleteUser(id);
  await taskService.unassignUserTasks(id);
};

const addUser = user => usersRepo.addUser(user);

const updateUser = (id, user) => usersRepo.updateUser(id, user);

module.exports = { getAll, getUser, deleteUser, addUser, updateUser };
