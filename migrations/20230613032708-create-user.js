'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userEmail: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
      },
      userCreatedTS: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
      },
      userHashedPW: {
          type: Sequelize.UUID,
          allowNull: false,
          unique: true,
      },
      userMediaList: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true, 
          defaultValue: "{}"
      },
      lastSignInTS: {
          type: Sequelize.DATE,
          allowNull: true,
          references: {
            table: 'signins',
            key: 'signInId'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      lastSignOutTS: {
          type: Sequelize.DATE,
          allowNull: true,
          references: {
            table: 'signins',
            key: 'signOutTS'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      userInternalNote: {
          type: Sequelize.STRING,
          allowNull: true,
      },
      userDisclAgreedTS: {
          type: Sequelize.DATE,
          allowNull: true,
      },
      isDisclAgreed: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
      },
      userUpdatedField: {
          type: Sequelize.STRING,
          allowNull: true,
      },
      isUserUpdated: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
      },
      userUpdatedTS: {
          type: Sequelize.DATE,
          allowNull: true
      },
      userRole: {
          type: Sequelize.ENUM('admin', 'client'),
          allowNull: true,
          defaultValue: 'client',
      },
      notesIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: "{}"
      },
      projectsIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: "{}"
      },
      timersIds: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: "{}"
      },
      signInIds: {
          type: Sequelize.ARRAY(Sequelize.UUID),
          allowNull: true,
          defaultValue: "{}"
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
