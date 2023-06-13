'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('timers', [{
      project_id: 1,
      timer_current_sec: 33,
      user_ids: [1]
    }, {
      timer_created_ts: '2018-01-01 00:00:00',
      project_id: 1
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('timers', null, {});
  }
};
