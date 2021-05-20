const { ValidationError } = require('sequelize');
const Controller = require('./controller');
<<<<<<< HEAD
const models = require('../models');
const moment = require('moment-timezone');
=======
const models = require("../models");
>>>>>>> master

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
      await req.flash('info', '保存しました');
      res.redirect(`/teams/${team.id}`);
    } catch (err) {
      if(err instanceof ValidationError){
        res.render('teams/create', { err });
      } else {
        throw err;
      }
    } 
  }

  // GET /:id
  async show(req, res) {
    const team = await this._team(req);
    const tasks = await team.getTeamTask({ order : [['id', 'ASC']] });
    await tasks.forEach((task) => {
      task.formattedCreatedAt = moment(task.updatedAt).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm');
    });
    res.render('teams/show', { team, tasks });
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
        { name: req.body.name },
        { where: { id: team.id } }
      );
      await req.flash('info', '更新しました');
      res.redirect(`/teams/${req.params.team}/edit`);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.render(`/teams/${req.params.team}/edit`, { err });
      } else {
        throw err;
      }
    }
  }

  async _team(req) {
<<<<<<< HEAD
    //console.log(req.params.team)
=======
    console.log(req.params.team);
>>>>>>> master
    const team = await models.Team.findByPk(req.params.team);
    if (!team) {
      throw new Error('User not find');
    }
    return team;
    
  }
  async _task(req) {
    //console.log(req.params.task)
    const task = await models.Task.findAll(req.params.task);
    if (!task) {
      throw new Error('User not find');
    }
    return task;
  }

}

module.exports = TeamsController;