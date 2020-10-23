const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: { type: mongoose.ObjectId, default: null },
    boardId: { type: mongoose.ObjectId, default: null },
    columnId: { type: mongoose.ObjectId, default: null }
  },
  { collection: 'tasks' }
);

const toResponse = task => {
  const { _id, title, order, description, userId, boardId, columnId } = task;
  return {
    id: _id,
    title,
    order: Number(order),
    description,
    userId,
    boardId,
    columnId
  };
};

module.exports = {
  Task: mongoose.model('tasks', Task),
  toResponse
};
