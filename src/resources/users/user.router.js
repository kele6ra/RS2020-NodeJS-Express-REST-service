const router = require('express').Router();
const User = require('./user.model');
const { OK, NO_CONTENT } = require('http-status-codes');
const usersService = require('./user.service');
const wrapAsync = require('../../utils/wrapAsync');
const { id, userBody } = require('../../utils/validation/shemas');
const validator = require('../../utils/validation/validator');

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const users = await usersService.getAll();
    await res.status(OK).json(users.map(User.getResponse));
  })
);

router.post(
  '/',
  validator(userBody, 'body'),
  wrapAsync(async (req, res) => {
    const user = await usersService.addUser(req.body);
    res.status(OK).send(User.getResponse(user));
  })
);

router.get(
  '/:id',
  validator(id, 'params'),
  wrapAsync(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    res.status(OK).send(User.getResponse(user));
  })
);

router.delete(
  '/:id',
  validator(id, 'params'),
  wrapAsync(async (req, res) => {
    await usersService.deleteUser(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

router.put(
  '/:id',
  validator(id, 'params'),
  validator(userBody, 'body'),
  wrapAsync(async (req, res) => {
    const user = await usersService.updateUser(req.body, req.params.id);
    res.status(OK).send(User.getResponse(user));
  })
);

module.exports = router;
