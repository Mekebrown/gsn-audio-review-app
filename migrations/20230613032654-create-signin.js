'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('signins', { 
      signInId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            table: 'users',
            key: 'userId'
          },
      },
      signInTS: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW
      },
      signOutTS: {
          type: Sequelize.DATE,
          allowNull: true
      },
      signInHeaders: {
          type: Sequelize.STRING,
          allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('signins');
  }
};
