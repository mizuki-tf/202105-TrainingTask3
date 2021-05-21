const models = require('../models');

module.exports = async function managebleTeam(req, res, next) {
  const team = await models.Team.findByPk(req.params.team);
  //teamに結びついmemberを持ってきて
  const manageMember = await team.getMember({
    where: { role: 1 }
  });

  const manageUser = manageMember[0];

  //managerはroleが1になる
  if (manageUser.userId　=== req.user.id) {
    return next();
  }
  else await req.flash('alert', 'アクセスできません');
  res.redirect('/');
};