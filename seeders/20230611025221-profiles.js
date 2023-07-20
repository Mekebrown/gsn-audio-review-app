'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'profiles', [
        {
          id: "test_999_id",
          userId: "admin@admin.co",
          profileCreatedTS: "2023-02-01 00:01:00",
          profileCreatedTS:  "2023-01-01 00:01:00",
          profileHashedPW: "the_admin_pw",
          profileInternalNote: "ADMIN",
          profileRole: "admin",
          lastSignInTS:  "2023-01-01 00:01:00",
        },
        {
          id: "test_111_id",
          userId: "client@client.co",
          profileCreatedTS: "2023-02-01 00:01:00",
          profileHashedPW: "the_client_pw",
          profileMediaList: [1],
          profileInternalNote: "CLIENT",
          lastSignInTS:  "2023-01-01 00:01:00",
          profileDisclAgreedTS: "2023-01-01 00:01:00",
          isDisclAgreed: true,
          profileUpdatedTS: "2023-01-01 00:01:00",
          profileUpdatedField: "media_list",
          isProfileUpdated: true,
        },
        {
          id: "test_123_id",
          userId: "new_client@new_client.co",
          ProfileCreatedTS: "2023-01-01 00:01:00",
          ProfileHashedPW: "new_client@new_client.co",
          ProfileInternalNote: "new_client@new_client.co",
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('profiles', null, {});
  }
};
