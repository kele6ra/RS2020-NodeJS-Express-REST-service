const NOT_FOUND_ERROR = require('../../errors/404');
const boards = [];

const addBoard = board => {
  boards.push(board);
  return board;
};

const deleteBoard = boardId => {
  const boardIndex = boards.findIndex(e => e.id === boardId);
  if (boardIndex === -1) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${boardId}`);
  }
  boards.splice(boardIndex, 1);
};

const getAll = () => {
  return boards.filter(e => e);
};

const getBoard = boardId => {
  const boardIndex = boards.findIndex(e => e.id === boardId);
  if (boardIndex === -1) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${boardId}`);
  }
  return boards[boardIndex];
};

const updateBoard = board => {
  const boardIndex = boards.findIndex(e => e.id === board.id);
  if (boardIndex === -1) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${board.id}`);
  }
  boards[boardIndex] = board;
  return board;
};

module.exports = { addBoard, deleteBoard, getAll, getBoard, updateBoard };
