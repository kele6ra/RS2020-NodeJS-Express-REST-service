const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema(
  {
    title: String,
    columns: [
      {
        id: { type: mongoose.ObjectId, default: null },
        title: String,
        order: String
      }
    ]
  },
  { collection: 'boards' }
);

module.exports = {
  Board: mongoose.model('boards', Board)
};
