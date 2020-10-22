const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const boardsService = require('./board.service');
const wrapAsync = require('../../utils/wrapAsync');
const { id, boardBody } = require('../../utils/validation/shemas');
const validator = require('../../utils/validation/validator');

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(OK).json(boards);
  })
);

router.post(
  '/',
  validator(boardBody, 'body'),
  wrapAsync(async (req, res) => {
    const board = await boardsService.addBoard(req.body);
    res.status(OK).json(board);
  })
);

router.get(
  '/:id',
  validator(id, 'params'),
  wrapAsync(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    res.status(OK).json(board);
  })
);

router.put(
  '/:id',
  validator(id, 'params'),
  validator(boardBody, 'body'),
  wrapAsync(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.id, req.body);
    res.status(OK).json(board);
  })
);

router.delete(
  '/:id',
  validator(id, 'params'),
  wrapAsync(async (req, res) => {
    await boardsService.deleteBoard(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
