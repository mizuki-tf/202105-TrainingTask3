'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.Team = this.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'team'
      });
      this.AssignUser = this.belongsTo(models.User, {
        foreignKey: 'assigneeId',
        as: 'assignUser'
      });
      this.Creator = this.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'creator'
      });
    }
  }
  Task.init({
    teamId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    creatorId: DataTypes.INTEGER,
    assigneeId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};