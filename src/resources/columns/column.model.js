const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title, order } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  get() {
    return { id: this.id, title: this.title, order: this.order };
  }
}

module.exports = Column;
