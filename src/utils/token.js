const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');
const UNAUTHORIZED_ERROR = require('../errors/401');

const checkToken = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET_KEY);
  } catch (err) {
    throw new UNAUTHORIZED_ERROR('Invaild token');
  }
  next();
};

const newToken = user =>
  jwt.sign({ id: user._id, login: user.login }, JWT_SECRET_KEY);

module.exports = { checkToken, newToken };
