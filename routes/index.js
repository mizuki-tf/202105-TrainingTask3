const { Route } = require('../lib/route');
const forceLogin = require('../app/middlewares/force_login');
const forceAdmin = require('../app/middlewares/force_admin');

const route = new Route();

// function style
route.get('/', function (req, res, _next) {
  res.render('index');
});

// single style
route.get('/user/edit', forceLogin, 'users_controller@edit');
route.put('/user', forceLogin, 'users_controller@update');

// /teams/:team/tasksのURL階層の作成。子ルート
const teamRoute = route.sub('/teams/:team', forceLogin);
teamRoute.resource('tasks', { controller: 'tasks_controller', only: ['create', 'store', 'edit', 'update'] });

// resource style
route.resource('examples', 'examples_controller');
//teamsのルート設定
route.resource('teams', { controller: 'teams_controller', only: ['create', 'store', 'show', 'edit', 'update'] });

// /adminのURL階層の作成。ログインチェック、管理者チェックが有効。
const adminRoute = route.sub('/admin', forceLogin, forceAdmin);
adminRoute.resource('users', 'admin/users_controller');



module.exports = route.router;
