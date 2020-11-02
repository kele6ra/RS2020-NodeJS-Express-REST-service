const createError = require('http-errors');
const express = require('express');
const { NOT_FOUND } = require('http-status-codes');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('express-async-errors');

const winston = require('./common/logging');
const token = require('./utils/token');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const errorHandler = require('./errors/handler');

const app = express();
app.disable('x-powered-by');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(
  morgan(
    ':method :status :url :query Body :body size :res[content-length] - :response-time ms',
    {
      stream: winston.stream
    }
  )
);

app.use('/login', loginRouter);
app.use(token.checkToken);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:id/tasks', taskRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(errorHandler);

module.exports = app;
