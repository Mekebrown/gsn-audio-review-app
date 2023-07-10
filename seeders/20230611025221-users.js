'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users', [
        {
          id: "test_999_id",
          name: "admin@admin.co",
          email: "admin@admin.co",
          emailVerified: "admin@admin.co",
          image: "n/a",
          userCreatedTS:  "2023-01-01 00:01:00",
          userHashedPW: "the_admin_pw",
          userInternalNote: "ADMIN",
          userRole: "admin",
          lastSignInTS:  "2023-01-01 00:01:00",
        },
        {
          id: "test_111_id",
          name: "client@client.co",
          email: "client@client.co",
          emailVerified: "client@client.co",
          image: "n/a",
          userCreatedTS: "2023-01-01 00:01:00",
          userMediaList: [1],
          userHashedPW: "the_client_pw",
          userInternalNote: "CLIENT",
          lastSignInTS:  "2023-01-01 00:01:00",
          userDisclAgreedTS: "2023-01-01 00:01:00",
          isDisclAgreed: true,
          userUpdatedTS: "2023-01-01 00:01:00",
          userUpdatedField: "media_list",
          isUserUpdated: true,
        },
        {
          id: "test_123_id",
          name: "new_client@new_client.co",
          email: "new_client@new_client.co",
          emailVerified: "new_client@new_client.co",
          image: "n/a",
          userHashedPW: "the_new_client_pw",
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
