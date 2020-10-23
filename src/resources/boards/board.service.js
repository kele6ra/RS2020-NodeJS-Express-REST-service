const boardsRepo = require('./board.mongo.repository');
const tasksService = require('../tasks/task.service');

const addBoard = boardData => boardsRepo.addBoard(boardData);

const deleteBoard = async boardId => {
  await boardsRepo.deleteBoard(boardId);
  await tasksService.deleteBoardTasks(boardId);
};

const getAll = () => boardsRepo.getAll();

const getBoard = boardId => boardsRepo.getBoard(boardId);

const updateBoard = (boardId, boardData) =>
  boardsRepo.updateBoard(boardId, boardData);

module.exports = { addBoard, deleteBoard, getAll, getBoard, updateBoard };
