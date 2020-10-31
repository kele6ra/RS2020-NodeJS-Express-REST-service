const router = require('express').Router({ mergeParams: true });
const { OK } = require('http-status-codes');
const loginService = require('./login.service');
const { userLogin } = require('../../utils/validation/shemas');
const validator = require('../../utils/validation/validator');

router.post('/', validator(userLogin, 'body'), async (req, res) => {
  const token = await loginService.verifyLogin(req.body);
  res.status(OK).json({ token });
});

module.exports = router;
