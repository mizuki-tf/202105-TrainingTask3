const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TopController extends Controller {
  //GET /
  async show(req, res) {
    const user = await models.User.findByPk(req.user.id);
    const teams = await user.getMembers({ include: 'teamInfo' });
    const assignTasks = await models.Task.findAll({ include: 'team', where: { assigneeId: req.user.id } })
    //console.log(JSON.stringify(teams));
    res.render('index', { teams: teams, user: user, assignTasks: assignTasks } );
  }

}

module.exports = TopController;