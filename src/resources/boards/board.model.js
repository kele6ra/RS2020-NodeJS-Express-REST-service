const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema(
  {
    title: String,
    columns: [
      {
        _id: { type: mongoose.ObjectId, default: mongoose.Types.ObjectId() },
        title: String,
        order: String
      }
    ]
  },
  { collection: 'boards' }
);

const toResponse = baord => {
  const { _id, title, columns } = baord;
  return {
    id: _id,
    title,
    columns: columns.map(e => ({
      id: _id,
      title: e.title,
      order: Number(e.order)
    }))
  };
};

module.exports = {
  Board: mongoose.model('boards', Board),
  toResponse
};
