'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'Wallets',
        {
          id: {
            primaryKey: true,
            allowNull: false,
            type: Sequelize.UUID
          },
          userId: {
            primaryKey: true,
            type: Sequelize.UUID

          },
          token: {
            allowNull: false,
            type: Sequelize.STRING
          },
          balance: {
            allowNull: false,
            type: Sequelize.DECIMAL,
            defaultValue: 0
          },
          lockedBalance: {
            allowNull: false,
            type: Sequelize.DECIMAL,
            defaultValue: 0
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
        }
    );
    await queryInterface.addConstraint(
        'Wallets',
        {
          type: 'FOREIGN KEY',
          name: 'Wallets_userId_fkey',
          fields: ['userId'],
          references: {
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Wallets', 'Wallets_userId_fkey');
    await queryInterface.dropTable('Wallets');
  }
};
