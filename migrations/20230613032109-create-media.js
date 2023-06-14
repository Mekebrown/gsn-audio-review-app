'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('media', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      projectId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            table: 'projects',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      mediaDescription: {
          type: Sequelize.STRING,
          allowNull: false
      },
      mediaS3URL: {
          type: Sequelize.STRING,
          allowNull: false
      },
      mediaCreatedTS: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
      },
      mediaType: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'audio'
      },
      hasMediaMarkers: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
      },
      mediaMarkersS3CSVURL: {
          type: Sequelize.STRING,
          allowNull: true
      },
      mediaUpdatedTS: {
          type: Sequelize.DATE,
          allowNull: true
      },
      notesIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: "{}"
      },
      usersIds: {
          type: Sequelize.ARRAY(Sequelize.UUID),
          allowNull: true,
          defaultValue: "{}"
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('media');
  }
};
