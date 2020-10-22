const mongoose = require('mongoose');
const logger = require('../common/logging');

const { MONGO_CONNECTION_STRING } = require('../common/config');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

const db = mongoose.connection;

const start = apiStartCallback =>
  db
    .on('error', () => logger.error('MongoDB connection error:'))
    .once('open', apiStartCallback);

module.exports = start;
