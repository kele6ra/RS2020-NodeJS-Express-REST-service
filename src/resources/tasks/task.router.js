const router = require('express').Router();
const tasksService = require('./task.service');

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const { tasks, code } = await tasksService.getBoardTasks(
      req.params.boardId
    );
    if (code === 200) res.json(tasks);
    else res.status(code).end();
  })
  .post(async (req, res) => {
    const { task, code } = await tasksService.addTask(
      req.body,
      req.params.boardId
    );
    if (code === 200) res.json(task);
    else res.status(code).end();
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res) => {
    const { task, code } = await tasksService.getTask(
      req.params.boardId,
      req.params.taskId
    );
    if (code === 200) res.json(task);
    else res.status(code).end();
  })
  .delete(async (req, res) => {
    const { code } = await tasksService.deleteTask(
      req.params.boardId,
      req.params.taskId
    );
    if (code === 204) res.end();
    else res.status(code).end();
  })
  .put(async (req, res) => {
    const { task, code } = await tasksService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    if (code === 200) res.json(task);
    else res.status(code).end();
  });

module.exports = router;
