const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TopController extends Controller {
  //GET /
  async top(req, res) {
    const user = await models.User.findByPk(req.user.id);
    const teams = await user.getMembers({ include: 'teamInfo' });
    console.log(JSON.stringify(teams));
    //const assignTasks = await models.Tasks.findAll({ where: { assigneeId: req.user.id } });
    res.render('index', { teams: teams ,user: user } );
  }

}

module.exports = TopController;