const logger = require('./common/logging');
const notFoundError = require('./errors/404');
const { PORT } = require('./common/config');
const mongoStart = require('./utils/mongo');
const userService = require('./resources/users/user.service');
const app = require('./app');

mongoStart(async () => {
  try {
    await userService.getUserByLogin('admin');
  } catch (e) {
    if (e instanceof notFoundError) {
      await userService.addUser({
        login: 'admin',
        password: 'admin',
        name: 'Ivanov Ivan Ivanovich'
      });
    } else {
      throw e;
    }
  }
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
