'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('timers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      projectId: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      timerCreatedTS: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
      },
      timerCurrentSec: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
      },
      isTimerPaused: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      isTimerCleared: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
      },
      isTimerRestarted: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
      },
      timerUpdatedTS: {
          type: Sequelize.DATE,
          allowNull: true
      },
      usersIds: {
          type: Sequelize.ARRAY(Sequelize.UUID),
          allowNull: true,
          defaultValue: []
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('timers');
  }
};
