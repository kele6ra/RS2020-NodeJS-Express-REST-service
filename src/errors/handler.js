const winston = require('../utils/winston');
const notFoundError = require('./404');

const handle = (err, req, res, next) => {
  if (err instanceof notFoundError) {
    winston.error(`Сode ${err.status}: ${err.shortMsg}`);
    res.status(err.status).send({ error: err.shortMsg });
  } else if (err) {
    winston.error(`Internal Server Error: ${err.stack || err.message}`);
    res.sendStatus(500);
  }

  next();
};

process.on('uncaughtException', err => {
  winston.error(`Uncaught exception: ${err.stack || err.message}`);
  winston.info('Shutting down');
  winston.finish(1);
});

process.on('unhandledRejection', (err, p) => {
  winston.error(
    `Unhandled exception: ${err.stack || err.message} at Promise ${p}`
  );
});

module.exports = handle;
