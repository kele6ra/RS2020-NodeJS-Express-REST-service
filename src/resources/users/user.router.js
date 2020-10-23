const router = require('express').Router();
const usersService = require('./user.service');
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./user.model');
const { id, userBody } = require('../../utils/validation/shemas');
const validator = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  await res.status(OK).json(users.map(toResponse));
});

router.post('/', validator(userBody, 'body'), async (req, res) => {
  const user = await usersService.addUser(req.body);
  res.status(OK).send(toResponse(user));
});

router.get('/:id', validator(id, 'params'), async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  res.status(OK).send(toResponse(user));
});

router.delete('/:id', validator(id, 'params'), async (req, res) => {
  await usersService.deleteUser(req.params.id);
  res.sendStatus(NO_CONTENT);
});

router.put(
  '/:id',
  validator(id, 'params'),
  validator(userBody, 'body'),
  async (req, res) => {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.status(OK).send(toResponse(user));
  }
);

module.exports = router;
