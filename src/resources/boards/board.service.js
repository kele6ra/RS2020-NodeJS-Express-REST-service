const Board = require('./board.model');
const boardsRepo = require('./board.mongo.repository');
const tasksService = require('../tasks/task.service');

const addBoard = boardData => {
  const board = new Board(boardData);
  return boardsRepo.addBoard(board.get());
};

const deleteBoard = boardId => {
  boardsRepo.deleteBoard(boardId);
  tasksService.deleteBoardTasks(boardId);
};

const getAll = () => boardsRepo.getAll();

const getBoard = boardId => boardsRepo.getBoard(boardId);

const updateBoard = (boardId, boardData) => {
  const board = boardsRepo.getBoard(boardId);
  const editedBoard = new Board(board);
  editedBoard.set(boardData);
  return boardsRepo.updateBoard(editedBoard.get());
};

module.exports = { addBoard, deleteBoard, getAll, getBoard, updateBoard };
