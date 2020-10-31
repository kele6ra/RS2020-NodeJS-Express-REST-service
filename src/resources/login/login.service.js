const userService = require('../users/user.service');
const UNAUTHORIZED_ERROR = require('../../errors/401');
const token = require('../../utils/token');
const bcrypt = require('bcrypt');

const verifyLogin = async credentials => {
  const user = await userService.getUserByLogin(credentials.login);
  const verify = await bcrypt.compare(credentials.password, user.password);
  if (!verify) {
    throw new UNAUTHORIZED_ERROR('Wrong password!');
  }
  return token.newToken(user);
};

module.exports = {
  verifyLogin
};
