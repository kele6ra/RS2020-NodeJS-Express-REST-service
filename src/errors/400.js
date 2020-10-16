class BadRequestError extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.shortMsg = message;
    this.status = '400';
  }
}

module.exports = BadRequestError;
