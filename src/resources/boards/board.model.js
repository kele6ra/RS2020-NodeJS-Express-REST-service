const uuid = require('uuid');
const Column = require('../columns/column.model');

class Board {
  constructor({ id = uuid(), title, columns } = {}) {
    this.id = id;
    this.title = title;
    this.columns =
      typeof columns === 'undefined'
        ? columns
        : columns.map(e => new Column(e).get());
  }

  set({ title, columns } = {}) {
    this.title = title;
    this.columns =
      typeof columns === 'undefined'
        ? columns
        : columns.map(e => new Column(e).get());
  }

  get() {
    return {
      id: this.id,
      title: this.title,
      columns: this.columns
    };
  }
}

module.exports = Board;
