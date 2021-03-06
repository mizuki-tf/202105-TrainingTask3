const { ValidationError } = require('sequelize');
const Controller = require('../controller');
const models = require('../../models');

class MembersController extends Controller {

  // POST /:id/members
  async store(req, res) {
    try {
      await models.Member.create({
        teamId: req.params.team,
        userId: req.body.userId
      });
      await req.flash('info', '保存しました');
      res.redirect(`/manager/teams/${req.params.team}/members`);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.render('manager/teams/create', { err: err });
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
    const members = await team.getMember({ include: 'userInfo', order: [['id', 'ASC']] });
    res.render('manager/members/index', { users, team, members });
  }

  async _team(req) {
    const team = await models.Team.findByPk(req.params.team);
    if (!team) {
      throw new Error('User not find');
    }
    return team;
  }
}

module.exports = MembersController;