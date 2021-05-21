const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const moment = require('moment-timezone');


class TeamsController extends Controller {

  // GET /creat
  async create(req, res) {
    res.render('teams/create');
  }

  // POST /
  async store(req, res) {
    try {
      const team = await models.Team.create({
        name: req.body.name,
        ownerId: req.user.id
      });

      await models.Member.create({
        teamId: team.id,
        userId: req.user.id,
        role: 1
      });

      await req.flash('info', '保存しました');
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