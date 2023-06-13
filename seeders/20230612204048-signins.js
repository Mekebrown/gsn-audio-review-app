'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [{
      sign_in_id: 'huh-111',
      sign_in_ts: '2020-01-01 00:00:00',
      user_id: "test_111_id"
    }, {
      sign_in_id: 'huh-999',
      sign_in_ts: '2020-01-01 00:00:00',
      user_id: "test_999_id"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
