const Controller = require('./controller');
const models = require('../models');

class TopController extends Controller {
  //GET /
  async index(req, res) {
    req.setLocale(req.query.lang || 'ja'); 
    const user = await models.User.findByPk(req.user.id);
    const teams = await user.getMembers({ include: 'teamInfo' });
    const assignTasks = await models.Task.findAll({ include: 'team', where: { assigneeId: req.user.id } });
    res.render('index', { teams: teams, user: user, assignTasks: assignTasks } );
  }

}

module.exports = TopController;