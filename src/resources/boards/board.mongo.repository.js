const NOT_FOUND_ERROR = require('../../errors/404');
const boards = [];

const addBoard = board => {
  boards.push(board);
  return board;
};

const deleteBoard = boardId => {
  const boardIndex = boards.findIndex(e => e.id === boardId);
  if (boardIndex === -1) {
    throw new NOT_FOUND_ERROR('board', { boardId });
  }
  boards.splice(boardIndex, 1);
};

const getAll = () => {
  return boards.filter(e => e);
};

const getBoard = boardId => {
  const boardIndex = boards.findIndex(e => e.id === boardId);
  if (boardIndex === -1) {
    throw new NOT_FOUND_ERROR('board', { boardId });
  }
  return boards[boardIndex];
};

const updateBoard = board => {
  const boardIndex = boards.findIndex(e => e.id === board.id);
  if (boardIndex === -1) {
    throw new NOT_FOUND_ERROR('board', { board: board.id });
  }
  boards[boardIndex] = board;
  return board;
};

module.exports = { addBoard, deleteBoard, getAll, getBoard, updateBoard };
