'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'Transactions',
        {
          id: {
            primaryKey: true,
            allowNull: false,
            type: Sequelize.UUID
          },
          type: {
            allowNull: false,
            type: Sequelize.STRING
          },
          from: {
            allowNull: false,
            type: Sequelize.STRING
          },
          to: {
            allowNull: false,
            type: Sequelize.STRING
          },
          amount: {
            allowNull: false,
            type: Sequelize.DECIMAL
          },
          removed: {
            type: Sequelize.BOOLEAN,
            allowNull: false
          },
          hash: {
            allowNull: false,
            type: Sequelize.STRING
          },
          index: {
            allowNull: false,
            type: Sequelize.INTEGER
          },
          returnValues: {
            type: Sequelize.JSONB
          },
          signature: {
            allowNull: false,
            type: Sequelize.STRING
          },
          rawData: {
            type: Sequelize.JSONB
          }
        });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};
