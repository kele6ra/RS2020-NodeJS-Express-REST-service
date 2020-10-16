class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.shortMsg = message;
    this.status = '404';
  }
}

module.exports = NotFoundError;
