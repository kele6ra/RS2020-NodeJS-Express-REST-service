const logger = require('./common/logging');
const { PORT } = require('./common/config');
const mongoStart = require('./utils/mongo');
const app = require('./app');

mongoStart(() =>
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  )
);
