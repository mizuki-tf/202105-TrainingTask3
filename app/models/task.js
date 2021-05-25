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
      this.Assignee = this.belongsTo(models.User, {
        foreignKey: 'assigneeId',
        as: 'assignee'
      });
      this.Creator = this.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'creator'
      });
    }

    // Commentの作成
    static async createCommnet(user, body) {
      const comment = await this.create({
        message: body.comment,
        : user.id
      });
      team.createMember({
        teamId: team.id,
        userId: user.id,
        role: 1
      });
      return team;
    }

  }
  Task.init({
    teamId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'タイトルは空ではいけません'
        },
        len: {
          msg: 'タイトルは10文字未満です',
          args: [0, 10]
        }
      }
    },
    body: {
      type: DataTypes.STRING,
      validate: {
        len: {
          msg: '本文は30文字未満です',
          args: [0, 30]
        }
      }
    },
    creatorId: DataTypes.INTEGER,
    assigneeId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};