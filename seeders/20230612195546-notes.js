'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notes', [{
      userId: 1,
      note_content: "(string)",
      mediaId: 1,
      replyNoteIds: [2]
    }, {
      userId: 1,
      note_content: 'This is a test note.',
      mediaId: 1,
      note_created_ts: "01-01-2021 00:00:00",
      noteUpdated_ts: "01-01-2023 00:00:00",
    }, {
      userId: 1,
      note_content: 'This is a test note.',
      mediaId: 1,
      note_created_ts: "01-01-2021 00:00:00",
      noteUpdated_ts: "01-01-2022 00:00:00",
      note_deleted_ts: "01-01-2023 00:00:00",
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notes', null, {});
  }
};
