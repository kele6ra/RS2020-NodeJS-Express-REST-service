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

module.exports = {
  Task: mongoose.model('tasks', Task)
};
