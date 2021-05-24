'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'creatorId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' }
    });
    await queryInterface.addColumn('Tasks', 'assigneeId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'creatorId');
    await queryInterface.removeColumn('Tasks', 'assigneeId');
  }
};
