const Controller = require('./controller');
const models = require('../models');

class TasksController extends Controller {
  async show(req, res) {
    const task = await models.Task.findOne({ include: 'team', where: { id: req.params.task } });
    const comments = await task.getTaskComments({ include: 'user' });
    res.render('manager/tasks/show', { task: task, comments: comments });
  }
  async store(req, res) {
    const task = await models.Task.findOne({ include: 'team', where: { id: req.params.task } });
    if (req.body.status === 1) {
      await models.Comment.finish(req.user, req.body, task);
    } else {
      await models.Comment.createTaskComments(req.user, req.body, task);
    }
    const comments = await task.getTaskComments({ include: 'user' });
    res.render('manager/tasks/show', { task: task, comments: comments });
  }
}

module.exports = TasksController;