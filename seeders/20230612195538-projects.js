'use strict';

/** @type {import('sequelize-cli').Migration} */

const aws_s3_url = process.env.NEXT_PUBLIC_AWS_S3_URL;

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('projects', [{
      project_name: 'Test Project',
    },{
      project_name: 'Test Project',
      project_logo_s3_url: `${aws_s3_url}/images/png/logo.png`,
      project_description: 'This is a test project.',
      media_ids: [1],
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
