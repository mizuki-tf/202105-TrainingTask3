const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TeamsController extends Controller {
  // GET /
  async index(req, res) {
    res.render('teams/index');
  }

  // GET /creat    
  async create(req, res) {
    res.render('teams/create');
  }

  // POST /
  async store(req, res) {
    //console.log(req.user);
    try {
      console.log("チーム名"+JSON.stringify(req.body.name)); 
      const team = await models.Team.create({
        name: req.body.name,
        ownerId: req.user.id
      });
      await req.flash('info', '保存しました');
      res.redirect(`/teams/${team.id}`);
    } catch (err) {
      if(err instanceof ValidationError){　//err：実際のエラー内容
        res.render('teams/create', { err: err });
      } else {
        throw err;
      }
   }
  }

// GET /:id
  async show(req, res) {
    const team = await this._team(req);
    const tasks = await team.getTeamTask({order : [['id', 'ASC']]});
    res.render('teams/show', { team , tasks });
  }

  // GET /:id/edit
  async edit(req, res) {
    const team = await this._team(req);
    res.render('teams/edit', { team });
  }

  // PUT or PATCH /:id
  async update(req, res) {
    const team = await this._team(req);
    try {
      await models.Team.update(
        {name: req.body.name},
        {where: {id: team.id}}
      );
      await req.flash('info', '更新しました');
      res.redirect(`/teams/${req.params.team}/edit`);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.render(`/teams/${req.params.team}/edit`, { team, err });
      } else {
        throw err;
      }
    }
  }

  // DELETE /:id
  async destroy(req, res) {
    await req.flash('info', '削除しました（未実装）');
    res.redirect('/examples/');
  }

  async _team(req) {
    console.log(req.params.team)
    const team = await models.Team.findByPk(req.params.team);
    if (!team) {
      throw new Error('User not find');
    }
    return team;
    
  }
  async _task(req) {
    console.log(req.params.task)
    const task = await models.Task.findAll(req.params.task);
    if (!task) {
      throw new Error('User not find');
    }
    return task;
  }

}

module.exports = TeamsController;