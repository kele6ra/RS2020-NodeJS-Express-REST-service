const { User } = require('./user.model');
const { NOT_FOUND_ERROR } = require('../../errors/404');

const getAll = () => User.find({});

const save = user => User.create(user);

const get = async id => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new NOT_FOUND_ERROR('user', { id });
  }
  return user;
};

const remove = id => User.findOneAndDelete({ _id: id });

const update = async (id, user) => {
  await User.findOneAndUpdate({ _id: id }, user);
  return get(id);
};

module.exports = { getAll, save, get, remove, update };
