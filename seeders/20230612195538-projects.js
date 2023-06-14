'use strict';

/** @type {import('sequelize-cli').Migration} */

const aws_s3_url = process.env.NEXT_PUBLIC_AWS_S3_URL;

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('projects', [{
      projectName: 'Test Project',
    },{
      projectName: 'Test Project',
      projectLogoS3URL: `${aws_s3_url}/images/png/logo.png`,
      projectDescription: 'This is a test project.',
      mediaIds: [1],
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
