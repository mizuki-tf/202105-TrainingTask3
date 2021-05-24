const Controller = require('./controller');
const models = require('../models');

class TasksController extends Controller {
  async show(req, res) {
    const task = await models.Task.findOne({ include: 'team', where: { id: req.params.task } });
    res.render('manager/tasks/show', { task: task });
  }
}

module.exports = TasksController;