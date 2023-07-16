'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('notes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      accountId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      noteContent: {
          type: Sequelize.STRING,
          allowNull: false
      },
      mediaId: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      noteCreatedTS: {
          type: Sequelize.DATE,
          allowNull: false, 
          defaultValue: Sequelize.NOW
      },
      noteUpdatedTS: {
          type: Sequelize.DATE,
          allowNull: true
      },
      noteDeletedTS: {
          type: Sequelize.DATE,
          allowNull: true
      },
      replyToNoteId: {
          type: Sequelize.INTEGER,
          allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('notes');
  }
};
