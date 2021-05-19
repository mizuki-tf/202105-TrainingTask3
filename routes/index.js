const { Route } = require('../lib/route');
const forceLogin = require('../app/middlewares/force_login');
const forceAdmin = require('../app/middlewares/force_admin');

const route = new Route();

// function style
route.get('/', function (req, res, _next) {
  res.render('teams/index', { title: 'Express', user: req.user });
});

// single style
route.get('/user/edit', forceLogin, 'users_controller@edit');
route.put('/user', forceLogin, 'users_controller@update');
//route.get('/teams/:tema/members', forceLogin, 'members_controller@show');
//route.post('/teams/:tema/members', forceLogin, 'members_controller@store');


// /teams/:team/tasksのURL階層の作成。子ルート
const teamRoute = route.sub('/teams/:team', forceLogin);
teamRoute.resource('tasks', { controller: 'tasks_controller', only: [ 'create','store','edit','update' ] });

// /team/:team/membersのURL階層の作成。
const memberRoute = route.sub('/teams/:team', forceLogin);
memberRoute.resource('members', { controller: 'members_controller', only: [ 'index','store' ] });

// resource style
route.resource('examples', 'examples_controller');

//teamsのルーティング
route.resource('teams', 'teams_controller');

// /adminのURL階層の作成。ログインチェック、管理者チェックが有効。
const adminRoute = route.sub('/admin', forceLogin, forceAdmin);
adminRoute.resource('users', 'admin/users_controller');



module.exports = route.router;
