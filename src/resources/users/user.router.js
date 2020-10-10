const router = require('express').Router();
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const { code, users } = await usersService.getAll();
    if (code === 200) res.json(users);
    else res.status(code).end();
  })
  .post(async (req, res) => {
    const { code, user } = await usersService.addUser(req.body);
    if (code === 200) res.json(user);
    else res.status(code).end();
  });

router
  .route('/:userId')
  .get(async (req, res) => {
    const { code, user } = await usersService.getUser(req.params.userId);
    if (code === 200) res.json(user);
    else res.status(code).end();
  })
  .delete(async (req, res) => {
    const { code } = await usersService.deleteUser(req.params.userId);
    if (code === 204) res.end();
    else res.status(code).end();
  })
  .put(async (req, res) => {
    const { code, user } = await usersService.updateUser(
      req.body,
      req.params.userId
    );
    if (code === 200) res.json(user);
    else res.status(code).end();
  });

module.exports = router;
