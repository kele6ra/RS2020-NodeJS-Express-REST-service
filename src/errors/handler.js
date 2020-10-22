const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const logger = require('../common/logging');

const handle = (err, req, res, next) => {
  if (err.status) {
    logger.error(`${err.status}: ${err.message}`);
    res.status(err.status).send(err.message);
  } else {
    logger.error(err.message);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = handle;
