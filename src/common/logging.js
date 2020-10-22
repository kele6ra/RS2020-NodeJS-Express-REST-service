const { LOGS_DIR, NODE_ENV } = require('./config');
const winston = require('winston');
const morgan = require('morgan');
const { combine, timestamp, prettyPrint } = winston.format;
require('winston-daily-rotate-file');

morgan.token('body', req =>
  JSON.stringify(req.body).replace(/,("password":").+"/, '$1***"')
);
morgan.token('query', req => JSON.stringify(req.query));

const transport = new winston.transports.DailyRotateFile({
  filename: `${LOGS_DIR}/application-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d'
});

const format = combine(timestamp(), prettyPrint());
const options = {
  fileInfo: {
    format,
    level: 'info',
    filename: `${LOGS_DIR}/app.log`,
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
  },
  fileUnhandled: {
    format,
    level: 'error',
    filename: `${LOGS_DIR}/exceptions.log`,
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
  },
  fileError: {
    format,
    level: 'error',
    filename: `${LOGS_DIR}/errors.log`,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.fileError),
    new winston.transports.File(options.fileInfo),
    transport
  ],
  exceptionHandlers: [new winston.transports.File(options.fileUnhandled)],
  exitOnError: true
});

if (NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'info',
      handleExceptions: true,
      handleRejections: true,
      colorize: true
    })
  );
}

logger.stream = {
  write: message => logger.info(message)
};

module.exports = logger;
