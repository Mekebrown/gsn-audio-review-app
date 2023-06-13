'use strict';

/** @type {import('sequelize-cli').Migration} */

const aws_s3_url = process.env.NEXT_PUBLIC_AWS_S3_URL;

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('media', [{
      media_id: 1,
      project_id: 1,
      media_description: 'This is a test audio file.',
      media_s3_url: `${aws_s3_url}/audio/mp3/audio.mp3`,
    }, {
      media_id: 1,
      project_id: 1,
      media_description: "(string)",
      media_s3_url: "(string)",
      has_media_markers: true,
      media_markers_s3_csv_url: `${aws_s3_url}/files/csv/markers.csv`,
      media_updated_ts: "01-01-2021 00:00:00",
      note_ids: [1],
      users_ids: [1]
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('media', null, {});
  }
};
