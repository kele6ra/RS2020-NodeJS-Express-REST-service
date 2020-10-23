const usersRepo = require('./user.mongo.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.get(id);

const deleteUser = id => usersRepo.remove(id);

const addUser = user => {
  return usersRepo.save(user);
};

const updateUser = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, getUser, deleteUser, addUser, updateUser };
