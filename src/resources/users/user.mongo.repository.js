const NOT_FOUND_ERROR = require('../../errors/404');
const users = [];

const addUser = user => {
  users.push(user);
  return user;
};

const deleteUser = userId => {
  const userIndex = users.findIndex(e => e.id === userId);
  if (userIndex === -1) {
    throw new NOT_FOUND_ERROR('user', { userId });
  }
  users.splice(userIndex, 1);
};

const getAll = () => {
  return users.filter(e => e);
};

const getUser = userId => {
  const userIndex = users.findIndex(e => e.id === userId);
  if (userIndex === -1) {
    throw new NOT_FOUND_ERROR('user', { userId });
  }
  return users[userIndex];
};

const updateUser = user => {
  const userIndex = users.findIndex(e => e.id === user.id);
  if (userIndex === -1) {
    throw new NOT_FOUND_ERROR('user', { user: user.id });
  }
  users[userIndex] = user;
  return user;
};

module.exports = { addUser, deleteUser, getAll, getUser, updateUser };
