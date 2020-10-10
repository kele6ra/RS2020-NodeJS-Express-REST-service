const router = require('express').Router();
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const { boards, code } = await boardsService.getAll();
    if (code === 200) res.json(boards);
    else res.status(code).end();
  })
  .post(async (req, res) => {
    const { board, code } = await boardsService.addBoard(req.body);
    if (code === 200) res.json(board);
    else res.status(code).end();
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const { board, code } = await boardsService.getBoard(req.params.boardId);
    if (code === 200) res.json(board);
    else res.status(code).end();
  })
  .delete(async (req, res) => {
    const { code } = await boardsService.deleteBoard(req.params.boardId);
    if (code === 204) res.end();
    else res.status(code).end();
  })
  .put(async (req, res) => {
    const { code, board } = await boardsService.updateBoard(
      req.params.boardId,
      req.body
    );
    if (code === 200) res.json(board);
    else res.status(code).end();
  });

module.exports = router;
