const usersRepo = require('./user.mongo.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const deleteUser = id => usersRepo.deleteUser(id);

const addUser = user => usersRepo.addUser(user);

const updateUser = (id, user) => usersRepo.updateUser(id, user);

module.exports = { getAll, getUser, deleteUser, addUser, updateUser };
