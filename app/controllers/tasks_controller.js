const Controller = require('./controller');
const models = require('../models');

class TasksController extends Controller {
  async show(req, res) {
    const task = await models.Task.findOne({ include: 'team', where: { id: req.params.task } });
    res.render('/manager/tasks/', { task: task });
  }
  async store(req, res) {
    const comment = await models.Comment.createComment(req.user, req.body);
    const task = await models.Task.findOne({ include: 'team', where: { id: req.params.task } });
    res.render('/manager/tasks/', { task: task });
  }
}

module.exports = TasksController;