const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TopController extends Controller {
  //GET /
  async top(req, res) {
    const user = await models.User.findByPk(req.user.id);
    const team = await user.getOwnTeams();
    const assignTasks = await user.getAssignTasks();
    res.render('index', team, assignTasks);
  }

}

module.exports = TopController;