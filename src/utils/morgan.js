const morgan = require('morgan');
const winston = require('./winston');

morgan.token('query', req => JSON.stringify(req.query));
morgan.token('url', req => req.hostname + req.originalUrl.split('?')[0]);
morgan.token('body', req => JSON.stringify(req.body));

const logger = morgan(
  ':method :url :query :body :status :res[content-length] - :response-time ms',
  { stream: winston.stream }
);

module.exports = logger;
