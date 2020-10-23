const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const boardsService = require('./board.service');
const { id, boardBody } = require('../../utils/validation/shemas');
const validator = require('../../utils/validation/validator');
const { toResponse } = require('./board.model');

router.get('/', async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(OK).json(boards.map(toResponse));
});

router.post('/', validator(boardBody, 'body'), async (req, res) => {
  const board = await boardsService.addBoard(req.body);
  res.status(OK).json(toResponse(board));
});

router.get('/:id', validator(id, 'params'), async (req, res) => {
  const board = await boardsService.getBoard(req.params.id);
  res.status(OK).json(toResponse(board));
});

router.put(
  '/:id',
  validator(id, 'params'),
  validator(boardBody, 'body'),
  async (req, res) => {
    const board = await boardsService.updateBoard(req.params.id, req.body);
    res.status(OK).json(toResponse(board));
  }
);

router.delete('/:id', validator(id, 'params'), async (req, res) => {
  await boardsService.deleteBoard(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
