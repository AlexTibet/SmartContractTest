'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'Users',
        {
          id: {
            primaryKey: true,
            allowNull: false,
            type: Sequelize.UUID
          },
          address: {
            allowNull: false,
            type: Sequelize.STRING
          }
        }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
