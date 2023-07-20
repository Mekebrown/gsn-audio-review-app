'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('profile', { 
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        profileCreatedTS: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        profileHashedPW: {
            type: Sequelize.UUID,
            allowNull: false,
            unique: true
        },
        profileMediaList: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: true, 
            defaultValue: []
        },
        lastSignInTS: {
            type: Sequelize.DATE,
            allowNull: true
        },
        lastSignOutTS: {
            type: Sequelize.DATE,
            allowNull: true
        },
        profileInternalNote: {
            type: Sequelize.STRING,
            allowNull: true
        },
        profileDisclAgreedTS: {
            type: Sequelize.DATE,
            allowNull: true
        },
        isDisclAgreed: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        profileUpdatedField: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isProfileUpdated: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        profileUpdatedTS: {
            type: Sequelize.DATE,
            allowNull: true
        },
        profileRole: {
            type: Sequelize.ENUM('admin', 'client'),
            allowNull: false,
            defaultValue: 'client'
        },
        notesIds: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: true,
            defaultValue: []
        },
        projectsIds: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: true,
            defaultValue: []
        },
        timersIds: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: true,
            defaultValue: []
        },
        profileHeaders: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('profile');
  }
};
