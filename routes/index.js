const { Route } = require('../lib/route');
const forceLogin = require('../app/middlewares/force_login');
const forceAdmin = require('../app/middlewares/force_admin');
const managebleTeam = require('../app/middlewares/manageble_team');

const route = new Route();

// topページのルート設定
route.get('/', forceLogin, 'top_controller@index');
route.get('/tasks/:task', forceLogin, 'tasks_controller@show');

// コメントのルート設定
route.post('/tasks/:task/comments', forceLogin, 'tasks_controller@comment');

// single style
route.get('/user/edit', forceLogin, 'users_controller@edit');
route.put('/user', forceLogin, 'users_controller@update');

// /adminのURL階層の作成。ログインチェック、管理者チェックが有効。
const adminRoute = route.sub('/admin', forceLogin, forceAdmin);
adminRoute.resource('/users', 'admin/users_controller');

// managerのURL階層の作成
route.resource('/teams', { controller: 'teams_controller', only: [ 'create', 'store' ] });

route.resource('manager/teams', forceLogin, managebleTeam, { controller: 'manager/teams_controller', only: [ 'show', 'edit', 'update' ] });
const managerTeamRoute = route.sub('/manager/teams/:team', forceLogin, managebleTeam);
managerTeamRoute.resource('/tasks', { controller: 'manager/tasks_controller', only: [ 'create', 'store', 'edit', 'update' ] });
managerTeamRoute.resource('/members', { controller: 'manager/members_controller', only: [ 'index', 'store' ] });


module.exports = route.router;
