const userService = require('../users/user.service');
const UNAUTHORIZED_ERROR = require('../../errors/401');
const FORBIDDEN_ERROR = require('../../errors/403');
const notFoundError = require('../../errors/404');
const token = require('../../utils/token');
const bcrypt = require('bcrypt');

const verifyLogin = async credentials => {
  try {
    const user = await userService.getUserByLogin(credentials.login);
    const verify = await bcrypt.compare(credentials.password, user.password);
    if (!verify) {
      throw new UNAUTHORIZED_ERROR('Wrong password!');
    }
    return token.newToken(user);
  } catch (e) {
    if (e instanceof notFoundError) {
      throw new FORBIDDEN_ERROR('User is not found!');
    }
    throw e;
  }
};

module.exports = {
  verifyLogin
};
