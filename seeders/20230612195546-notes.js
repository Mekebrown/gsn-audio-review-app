'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notes', [{
      user_id: 1,
      note_content: "(string)",
      media_id: 1,
      reply_note_ids: [2]
    }, {
      user_id: 1,
      note_content: 'This is a test note.',
      media_id: 1,
      note_created_ts: "01-01-2021 00:00:00",
      note_updated_ts: "01-01-2023 00:00:00",
    }, {
      user_id: 1,
      note_content: 'This is a test note.',
      media_id: 1,
      note_created_ts: "01-01-2021 00:00:00",
      note_updated_ts: "01-01-2022 00:00:00",
      note_deleted_ts: "01-01-2023 00:00:00",
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notes', null, {});
  }
};
