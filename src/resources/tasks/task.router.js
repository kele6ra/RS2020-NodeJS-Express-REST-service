const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const tasksService = require('./task.service');
const wrapAsync = require('../../utils/wrapAsync');
const { taskId } = require('../../utils/validation/shemas');
const validator = require('../../utils/validation/validator');

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const tasks = await tasksService.getBoardTasks(req.params.id);
    await res.status(OK).json(tasks);
  })
);

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const task = await tasksService.addTask(req.body, req.params.id);
    res.status(OK).send(task);
  })
);

router.get(
  '/:taskId',
  validator(taskId, 'params'),
  wrapAsync(async (req, res) => {
    const task = await tasksService.getTask(req.params.id, req.params.taskId);
    res.status(OK).send(task);
  })
);

router.delete(
  '/:taskId',
  validator(taskId, 'params'),
  wrapAsync(async (req, res) => {
    await tasksService.deleteTask(req.params.id, req.params.taskId);
    res.sendStatus(NO_CONTENT);
  })
);

router.put(
  '/:taskId',
  validator(taskId, 'params'),
  wrapAsync(async (req, res) => {
    const task = await tasksService.updateTask(
      req.params.id,
      req.params.taskId,
      req.body
    );
    res.status(OK).send(task);
  })
);

module.exports = router;
