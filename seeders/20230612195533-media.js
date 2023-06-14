'use strict';

/** @type {import('sequelize-cli').Migration} */

const aws_s3_url = process.env.NEXT_PUBLIC_AWS_S3_URL;

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('media', [{
      mediaId: 1,
      projectId: 1,
      mediaDescription: 'This is a test audio file.',
      mediaS3URL: `${aws_s3_url}/audio/mp3/audio.mp3`,
    }, {
      mediaId: 1,
      projectId: 1,
      mediaDescription: "(string)",
      mediaS3URL: "(string)",
      hasMediaMarkers: true,
      mediaMarkersS3CSVURL: `${aws_s3_url}/files/csv/markers.csv`,
      mediaUpdatedTS: "01-01-2021 00:00:00",
      noteIds: [1],
      usersIds: [1]
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('media', null, {});
  }
};
