'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.Task = this.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'task'
      });
      this.User = this.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'user'
      });
    }
  }
  Comment.init({
    taskId: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    kind: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};