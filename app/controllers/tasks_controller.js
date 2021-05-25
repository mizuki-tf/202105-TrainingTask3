const { ValidationError } = require("sequelize");
const Controller = require('./controller');
const models = require('../models');

class TasksController extends Controller {
  async show(req, res) {
    const task = await models.Task.findByPk(req.params.task);
    const team = await task.getTeam();
    const comments = await task.getTaskComments({
      include: 'user',
      order: [["id", "ASC"]]
    });
    res.render('manager/tasks/show', { task: task, team: team, comments: comments });
  }

  async store(req, res) {
    try {
      if (req.body.status === "1") {
        const task = await models.Task.findByPk(req.params.task);
        task.finish(req.user, req.body);
      } else {
        await models.Comment.create({
          taskId: req.params.task,
          creatorId: req.user.id,
          message: req.body.comment,
          kind: 0
        });
      }
      res.redirect(`/tasks/${req.params.task}`);
    } catch (err) {
      if(err instanceof ValidationError){
        res.render('manager/tasks/show', { err: err });
      } else {
        throw err;
      }
    }
  }
}

module.exports = TasksController;