const { Board } = require('./board.model');
const NOT_FOUND_ERROR = require('../../errors/404');

const addBoard = board => Board.create(board);

const deleteBoard = async boardId => {
  const board = await Board.findOneAndDelete({ _id: boardId });
  if (!board) {
    throw new NOT_FOUND_ERROR('user', { boardId });
  }
  return board;
};

const getAll = () => Board.find({});

const getBoard = async boardId => {
  const board = await Board.findOne({ _id: boardId });
  if (!board) {
    throw new NOT_FOUND_ERROR('user', { boardId });
  }
  return board;
};

const updateBoard = async (boardId, boardData) => {
  const board = await Board.findOneAndUpdate({ _id: boardId }, boardData, {
    new: true
  });
  if (!board) {
    throw new NOT_FOUND_ERROR('user', { boardId });
  }
  return board;
};

module.exports = { addBoard, deleteBoard, getAll, getBoard, updateBoard };
