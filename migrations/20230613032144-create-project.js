'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('projects', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      projectName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      projectCreatedTS: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
      },
      projectLogoS3URL: {
          type: Sequelize.STRING,
          allowNull: true
      },
      projectDescription: {
          type: Sequelize.STRING,
          allowNull: true
      },
      projectUpdatedTS: {
          type: Sequelize.DATE,
          allowNull: true
      },
      mediaIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: "{}"
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};
