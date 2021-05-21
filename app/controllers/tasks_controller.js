const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TasksController extends Controller {
  // GET /creat
  async create(req, res) {
    const team = await this._team(req);
    res.render('tasks/create', { team });
  }

  // POST /
  async store(req, res) {
    try {
      const team = await this._team(req);
      await models.Task.create({
        teamId: team.id,
        title: req.body.title,
        body: req.body.body
      });
      await req.flash('info', '保存しました');
      res.redirect(`/teams/${team.id}`);
    } catch (err) {
      if(err instanceof ValidationError){
        res.render('tasks/create', { err: err });
      } else {
        throw err;
      }
    }
  }

  // GET /:id/edit
  async edit(req, res) {
    const team = await this._team(req);
    //チームに結びついたタスクの内、urlの:taskのIdを使って一つのタスクに絞り込む
    const tasks = await team.getTeamTask({ where: { id: req.params.task } });
    res.render('tasks/edit', { team, task: tasks[0] });
  }

  // PUT or PATCH /:id
  async update(req, res) {
    const task = await this._task(req);
    try {
      await models.Task.update({
        title: req.body.title,
        body: req.body.body
      }, {
        where: { id: task.id }
      });
      await req.flash('info', '更新しました');
      res.redirect(`/teams/${req.params.team}`);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.render(`/teams/${req.params.team}/edit`, { err });
      } else {
        throw err;
      }
    }
  }

  async _team(req) {
    const team = await models.Team.findByPk(req.params.team);
    if (!team) {
      throw new Error('User not find');
    }
    return team;

  }

  async _task(req) {
    const task = await models.Task.findByPk(req.params.task);
    if (!task) {
      throw new Error('User not find');
    }
    return task;
  }

}

module.exports = TasksController;