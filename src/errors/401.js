const { UNAUTHORIZED } = require('http-status-codes');

class UnauthorizedError extends Error {
  constructor(entity, params, message) {
    super(message || 'Authentication failed');
    this.status = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
