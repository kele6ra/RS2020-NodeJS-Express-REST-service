const { User } = require('./user.model');
const NOT_FOUND_ERROR = require('../../errors/404');

const getAll = () => User.find({});

const addUser = user => User.create(user);

const getUser = async userId => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NOT_FOUND_ERROR('user', { userId });
  }
  return user;
};

const deleteUser = userId => {
  const user = User.findOneAndDelete({ _id: userId });
  if (!user) {
    throw new NOT_FOUND_ERROR('user', { userId });
  }
};

const updateUser = async (userId, userData) => {
  const user = await User.findOneAndUpdate({ _id: userId }, userData);
  if (!user) {
    throw new NOT_FOUND_ERROR('user', { userId });
  }
  return user;
};

module.exports = { getAll, addUser, getUser, deleteUser, updateUser };
