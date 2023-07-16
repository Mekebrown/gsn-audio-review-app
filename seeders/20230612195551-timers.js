'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('timers', [{
      id: 1,
      projectId: 1,
      timerCreatedTS: '2018-01-01 00:00:00',
      timerCurrentSec: 33,
      isTimerPaused: true,
      accountsIds: [1]
    }, {
      id: 2,
      projectId: 1,
      timerCreatedTS: '2018-01-01 00:00:00',
      timerCurrentSec: 0,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('timers', null, {});
  }
};
