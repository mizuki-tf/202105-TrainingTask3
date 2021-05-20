const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class MembersController extends Controller {

  // POST /:id/members
  async store(req, res) {
    try {
      await models.Member.create({
        teamId: req.params.team,
        userId: req.body.userId
      });
      await req.flash('info', '保存しました');
      res.redirect(`/teams/${req.params.team}/members`);
    } catch (err) {
      if (err instanceof ValidationError) {　
        res.render('teams/create', { err: err });
      } else {
        throw err;
      }
    }
  }

  // GET /:id/members
  async index(req, res) {
    //全ユーザーの情報持ってくる
    const users = await models.User.findAll({ order: [['id', 'ASC']] });
    const team = await this._team(req);
    //チームに結びついたメンバーを持ってくる
    const members = await team.getTeamMem({ include: 'user', order: [['id', 'ASC']] });
    //console.log(users);
    res.render('members/index', { users, team, members });
  }

  async _team(req) {
    //console.log(req.params.team);
    const team = await models.Team.findByPk(req.params.team);
    if (!team) {
      throw new Error('User not find');
    }
    return team;
  }
}

module.exports = MembersController;