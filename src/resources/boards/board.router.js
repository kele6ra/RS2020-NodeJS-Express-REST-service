const router = require('express').Router();
const boardsService = require('./board.service');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boards = await boardsService.getAll();
    res.send(boards);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const board = await boardsService.addBoard(req.body);
    res.send(board);
  })
);

router.route('/:boardId').get(
  wrapAsync(async (req, res) => {
    const board = await boardsService.getBoard(req.params.boardId);
    res.send(board);
  })
);

router.route('/:boardId').delete(
  wrapAsync(async (req, res) => {
    await boardsService.deleteBoard(req.params.boardId);
    res.sendStatus(204);
  })
);

router.route('/:boardId').put(
  wrapAsync(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.boardId, req.body);
    res.send(board);
  })
);

module.exports = router;
