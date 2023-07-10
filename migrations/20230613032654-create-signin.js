'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('signins', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
          type: Sequelize.UUID,
          allowNull: false
      },
      signInTS: {
          type: Sequelize.DATE,
          allowNull: false,
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
