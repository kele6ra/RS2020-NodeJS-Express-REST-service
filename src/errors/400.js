const { BAD_REQUEST } = require('http-status-codes');

class BadRequestError extends Error {
  constructor(entity, params, message) {
    super(message || `Problems with ${entity} and: ${JSON.stringify(params)}`);
    this.status = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
