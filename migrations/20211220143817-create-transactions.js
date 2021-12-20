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
          blockNumber: {
            allowNull: false,
            type: Sequelize.INTEGER
          },
          blockHash: {
            allowNull: false,
            type: Sequelize.STRING
          },
          logIndex: {
            allowNull: false,
            type: Sequelize.INTEGER
          },
          transactionIndex: {
            allowNull: false,
            type: Sequelize.INTEGER
          },
          transactionHash: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
          },
          returnValues: {
            allowNull: false,
            type: Sequelize.JSONB
          },
          signature: {
            allowNull: false,
            type: Sequelize.STRING
          },
          rawData: {
            allowNull: false,
            type: Sequelize.JSONB
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
          }
        });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};
