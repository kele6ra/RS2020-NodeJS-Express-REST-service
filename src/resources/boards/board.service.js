const Board = require('./board.model');
const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const addBoard = boardData => {
  const board = new Board(boardData);
  // if (
  //   typeof board.title === 'undefined' ||
  //   typeof board.columns === 'undefined'
  // ) {
  //   return { code: 400 };
  // }
  return boardsRepo.addBoard(board.get());
};

const deleteBoard = boardId => {
  boardsRepo.deleteBoard(boardId);
  tasksService.deleteBoardTasks(boardId);
};

const getAll = () => {
  return boardsRepo.getAll();
};

const getBoard = boardId => {
  return boardsRepo.getBoard(boardId);
};

const updateBoard = (boardId, boardData) => {
  const board = boardsRepo.getBoard(boardId);
  const editedBoard = new Board(board);
  editedBoard.set(boardData);
  // if (
  //   typeof editedBoard.title === 'undefined' ||
  //   typeof editedBoard.columns === 'undefined'
  // ) {
  //   return { code: 400 };
  // }
  return boardsRepo.updateBoard(editedBoard.get());
};

module.exports = { addBoard, deleteBoard, getAll, getBoard, updateBoard };
