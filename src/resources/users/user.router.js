const router = require('express').Router();
const usersService = require('./user.service');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const users = await usersService.getAll();
    res.send(users);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const user = await usersService.addUser(req.body);
    res.send(user);
  })
);

router.route('/:userId').get(
  wrapAsync(async (req, res) => {
    const user = await usersService.getUser(req.params.userId);
    res.send(user);
  })
);

router.route('/:userId').delete(
  wrapAsync(async (req, res) => {
    await usersService.deleteUser(req.params.userId);
    res.sendStatus(204);
  })
);

router.route('/:userId').put(
  wrapAsync(async (req, res) => {
    const user = await usersService.updateUser(req.body, req.params.userId);
    res.send(user);
  })
);

module.exports = router;
