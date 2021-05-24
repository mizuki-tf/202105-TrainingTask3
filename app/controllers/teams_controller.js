const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TeamsController extends Controller {

  // GET /creat
  async create(req, res) {
    res.render('teams/create');
  }

  // POST /
  async store(req, res) {
    try {
      const team = await models.Team.createWithOwner(req.user, req.body);
      await req.flash('info', `新規チーム${team.name}を作成しました`)
      res.redirect(`manager/teams/${team.id}`);
    } catch (err) {
      if(err instanceof ValidationError){
        res.render('teams/create', { err });
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
    const task = await models.Task.findAll(req.params.task);
    if (!task) {
      throw new Error('User not find');
    }
    return task;
  }

}

module.exports = TeamsController;