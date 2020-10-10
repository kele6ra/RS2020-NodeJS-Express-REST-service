const Board = require('./board.model');
const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const addBoard = async boardData => {
  const board = new Board(boardData);
  if (
    typeof board.title === 'undefined' ||
    typeof board.columns === 'undefined'
  ) {
    return { code: 400 };
  }
  const { error } = await boardsRepo.addBoard(board.get());
  return error ? { code: 400 } : { code: 200, board: board.get() };
};

const deleteBoard = async boardId => {
  const { error } = await boardsRepo.deleteBoard(boardId);
  if (error === 0) await tasksService.deleteBoardTasks(boardId);
  return error ? { code: error === 1 ? 404 : 400 } : { code: 204 };
};

const getAll = async () => {
  const { error, boards } = await boardsRepo.getAll();
  return error
    ? { code: 400 }
    : { code: 200, boards: boards.map(e => new Board(e).get()) };
};

const getBoard = async boardId => {
  const { error, board } = await boardsRepo.getBoard(boardId);
  return error
    ? { code: error === 1 ? 404 : 400 }
    : { code: 200, board: new Board(board).get() };
};

const updateBoard = async (boardId, boardData) => {
  const { error, board } = await boardsRepo.getBoard(boardId);
  if (error === 1) return { code: 404 };
  const editedBoard = new Board(board);
  editedBoard.set(boardData);
  if (
    typeof editedBoard.title === 'undefined' ||
    typeof editedBoard.columns === 'undefined'
  ) {
    return { code: 400 };
  }
  const result = await boardsRepo.updateBoard(editedBoard.get());
  return result.error
    ? { code: result.error === 1 ? 404 : 400 }
    : { code: 200, board: editedBoard.get() };
};

module.exports = { addBoard, deleteBoard, getAll, getBoard, updateBoard };
