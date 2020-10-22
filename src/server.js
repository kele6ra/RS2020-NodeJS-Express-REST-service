const logger = require('./common/logging');
const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);
