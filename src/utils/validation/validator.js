const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const logger = require('../../common/logging');

const errorResponse = errors => {
  return {
    status: 'failed',
    errors: errors.map(err => {
      const { path, message } = err;
      return { path, message };
    })
  };
};

const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      logger.error(JSON.stringify(error.details));
      res
        .status(property === 'body' ? UNPROCESSABLE_ENTITY : BAD_REQUEST)
        .json({ error: errorResponse(error.details) });
    } else {
      // eslint-disable-next-line callback-return
      next();
    }
  };
};

module.exports = validator;
