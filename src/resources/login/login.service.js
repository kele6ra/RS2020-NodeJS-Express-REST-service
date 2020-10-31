const userService = require('../users/user.service');
const UNAUTHORIZED_ERROR = require('../../errors/401');
const FORBIDDEN_ERROR = require('../../errors/403');
const token = require('../../utils/token');
const bcrypt = require('bcrypt');
const logger = require('../../common/logging');

const verifyLogin = async credentials => {
  try {
    const user = await userService.getUserByLogin(credentials.login);
    const verify = await bcrypt.compare(credentials.password, user.password);
    if (!verify) {
      throw new UNAUTHORIZED_ERROR('Wrong password!');
    }
    return token.newToken(user);
  } catch (e) {
    logger.error(e.message);
    throw new FORBIDDEN_ERROR('User or password is wrong!');
  }
};

module.exports = {
  verifyLogin
};
