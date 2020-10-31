const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');
const UNAUTHORIZED_ERROR = require('../errors/401');

const checkToken = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw 'Wrong token';
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') throw 'Wrong token';
    jwt.verify(token, JWT_SECRET_KEY);
  } catch {
    throw new UNAUTHORIZED_ERROR('Wrong token');
  }
  next();
};

const newToken = user =>
  jwt.sign({ id: user._id, login: user.login }, JWT_SECRET_KEY);

module.exports = { checkToken, newToken };
