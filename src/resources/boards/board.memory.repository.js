const boards = [];

const addBoard = async board => {
  try {
    boards.push(board);
    return { error: 0 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const deleteBoard = async boardId => {
  try {
    const boardIndex = boards.findIndex(e => e.id === boardId);
    if (boardIndex >= 0) {
      boards.splice(boardIndex, 1);
      return { error: 0 };
    }
    return { error: 1 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const getAll = async () => {
  try {
    return { error: 0, boards };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const getBoard = async boardId => {
  try {
    const boardIndex = boards.findIndex(e => e.id === boardId);
    return boardIndex === -1
      ? { error: 1 }
      : { error: 0, board: boards[boardIndex] };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

const updateBoard = async board => {
  try {
    const boardIndex = boards.findIndex(e => e.id === board.id);
    if (boardIndex >= 0) {
      boards[boardIndex] = board;
      return { error: 0 };
    }
    return { error: 1 };
  } catch (error) {
    console.error(error);
    return { error: 255 };
  }
};

module.exports = { addBoard, deleteBoard, getAll, getBoard, updateBoard };
