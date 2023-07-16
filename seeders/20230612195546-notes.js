'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notes', [{
      id: 1,
      accountId: 1,
      noteContent: "(string)",
      mediaId: 1,
      noteCreatedTS: "01-01-2021 00:00:00",
      replyToNoteID: [2]
    }, {
      id: 2,
      accountId: 1,
      noteContent: 'This is a test note.',
      mediaId: 1,
      noteCreatedTS: "01-01-2021 00:00:00",
      noteUpdatedTS: "01-01-2023 00:00:00",
    }, {
      id: 3,
      accountId: 1,
      noteContent: 'This is a test note.',
      mediaId: 1,
      noteCreatedTS: "01-01-2021 00:00:00",
      noteUpdatedTS: "01-01-2022 00:00:00",
      noteDeletedTS: "01-01-2023 00:00:00",
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notes', null, {});
  }
};
