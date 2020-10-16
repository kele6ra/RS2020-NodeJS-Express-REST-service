const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const tasks = await tasksService.getBoardTasks(req.params.boardId);
    res.send(tasks);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const task = await tasksService.addTask(req.body, req.params.boardId);
    res.send(task);
  })
);

router.route('/:taskId').get(
  wrapAsync(async (req, res) => {
    const task = await tasksService.getTask(
      req.params.boardId,
      req.params.taskId
    );
    res.send(task);
  })
);

router.route('/:taskId').delete(
  wrapAsync(async (req, res) => {
    await tasksService.deleteTask(req.params.boardId, req.params.taskId);
    res.sendStatus(204);
  })
);

router.route('/:taskId').put(
  wrapAsync(async (req, res) => {
    const task = await tasksService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.send(task);
  })
);

module.exports = router;
