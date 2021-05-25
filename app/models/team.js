'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.Owner = this.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner'
      });
      this.TeamTask = this.hasMany(models.Task, {
        foreignKey: 'teamId',
        as: 'teamTask'
      });
      this.Member = this.hasMany(models.Member, {
        foreignKey: 'teamId',
        as: 'member'
      });
    }

    // チーム作成及びチーム作成者を担当者としてメンバー登録
    static async createWithOwner(user, body) {
      const team = await this.create({
        name: body.name,
        ownerId: user.id
      });
      team.createMember({
        teamId: team.id,
        userId: user.id,
        role: 1
      });
      return team;
    }

    async isManager(user) {
      const member = await user.getMembers({
        where: { teamId: this.id }
      });
      const userRole = member[0];
      return parseInt(userRole.role) === 1;
    }
  }
  Team.init({
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};