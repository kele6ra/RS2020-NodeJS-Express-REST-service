const { FORBIDDEN } = require('http-status-codes');

class ForbiddenError extends Error {
  constructor(entity, params, message) {
    super(message || 'Forbidden');
    this.status = FORBIDDEN;
  }
}

module.exports = ForbiddenError;
