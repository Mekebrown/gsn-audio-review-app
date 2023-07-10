'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('signins', [{
      id: 'huh-111',
      userId: "test_111_id",
      signInTS: '2020-01-01 00:00:00',
      signOutTS: '2020-01-01 00:00:00',
      signInHeaders: "n/a",
    }, {
      id: 'huh-999',
      signInTS: '2020-01-01 00:00:00',
      userId: "test_999_id"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('signins', null, {});
  }
};
