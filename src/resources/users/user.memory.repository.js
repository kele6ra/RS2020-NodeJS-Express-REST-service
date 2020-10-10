const users = [];

const addUser = async user => {
  try {
    users.push(user);
    return { error: 0 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const deleteUser = async userId => {
  try {
    const userIndex = users.findIndex(e => e.id === userId);
    if (userIndex >= 0) {
      users.splice(userIndex, 1);
      return { error: 0 };
    }
    return { error: 1 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const getAll = async () => {
  try {
    return { error: 0, users };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const getUser = async userId => {
  try {
    const userIndex = users.findIndex(e => e.id === userId);
    return userIndex === -1
      ? { error: 1 }
      : { error: 0, user: users[userIndex] };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const updateUser = async user => {
  try {
    const userIndex = users.findIndex(e => e.id === user.id);
    if (userIndex >= 0) {
      users[userIndex] = user;
      return { error: 0 };
    }
    return { error: 1 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

module.exports = { addUser, deleteUser, getAll, getUser, updateUser };
