'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.UserInfo = this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'userInfo'
      });
      this.TeamInfo = this.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'teamInfo'
      });
    }
  }
  Member.init({
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};