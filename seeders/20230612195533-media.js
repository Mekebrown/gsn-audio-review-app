'use strict';

/** @type {import('sequelize-cli').Migration} */

const aws_s3_url = process.env.AWS_URL;

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('media', [{
      id: 1,
      projectId: 1,
      mediaDescription: 'This is a test audio file.',
      mediaS3Directory: `${aws_s3_url}/audio/mp3`,
      mediaS3FileName:  `audio.mp3`,
      mediaType: "audio",
      mediaCreatedTS: "01-01-2021 00:00:00",
    }, {
      id: 2,
      projectId: 1,
      mediaDescription: "(string)",
      mediaS3Directory: `${aws_s3_url}/audio/mp3`,
      mediaS3FileName:  `audio.mp3`,
      mediaType: "audio",
      mediaCreatedTS: "01-01-2021 00:00:00",
      hasMediaMarkers: true,
      mediaMarkersS3CSVURL: `${aws_s3_url}/files/csv/markers.csv`,
      noteIds: [1],
      profilesIds: [1]
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('media', null, {});
  }
};
