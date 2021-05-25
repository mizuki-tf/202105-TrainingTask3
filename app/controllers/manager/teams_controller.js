const { ValidationError } = require('sequelize');
const Controller = require('../controller');
const models = require('../../models');

class TeamsController extends Controller {

  // GET /:id
  async show(req, res) {
    const team = await this._team(req);
    const tasks = await team.getTeamTask({ order : [['id', 'ASC']] });
    res.render('manager/teams/show', { team, tasks });
  }

  // GET /:id/edit
  async edit(req, res) {
    const team = await this._team(req);
    res.render('manager/teams/edit', { team });
  }

  // PUT or PATCH /:id
  async update(req, res) {
    const team = await this._team(req);
    try {
      await models.Team.update(
        { name: req.body.name },
        { where: { id: team.id } }
      );
      await req.flash('info', '更新しました');
      res.redirect(`/manager/teams/${req.params.team}/edit`);
    } catch (err) {
      if (err instanceof ValidationError) {
        const team = await this._team(req);
        res.render('manager/teams/edit', { err: err, team: team });
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