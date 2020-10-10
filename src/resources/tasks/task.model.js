const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = '',
    order,
    description = '',
    userId = null,
    boardId,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  set({ title, order, description, userId, boardId, columnId } = {}) {
    this.title = typeof title === 'undefined' ? this.title : title;
    this.order = order;
    this.description =
      typeof description === 'undefined' ? this.description : description;
    this.userId = typeof userId === 'undefined' ? this.userId : userId;
    this.boardId = boardId;
    this.columnId = typeof columnId === 'undefined' ? this.columnId : columnId;
  }

  get() {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      description: this.description,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId
    };
  }

  toResponce() {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      description: this.description,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId
    };
  }
}

module.exports = Task;
