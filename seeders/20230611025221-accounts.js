'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'accounts', [
        {
          id: "test_999_id",
          userId: "admin@admin.co",
          accountCreatedTS: "2023-02-01 00:01:00",
          accountCreatedTS:  "2023-01-01 00:01:00",
          accountHashedPW: "the_admin_pw",
          accountInternalNote: "ADMIN",
          accountRole: "admin",
          lastSignInTS:  "2023-01-01 00:01:00",
        },
        {
          id: "test_111_id",
          userId: "client@client.co",
          accountCreatedTS: "2023-02-01 00:01:00",
          accountHashedPW: "the_client_pw",
          accountMediaList: [1],
          accountInternalNote: "CLIENT",
          lastSignInTS:  "2023-01-01 00:01:00",
          accountDisclAgreedTS: "2023-01-01 00:01:00",
          isDisclAgreed: true,
          accountUpdatedTS: "2023-01-01 00:01:00",
          accountUpdatedField: "media_list",
          isAccountUpdated: true,
        },
        {
          id: "test_123_id",
          userId: "new_client@new_client.co",
          AccountCreatedTS: "2023-01-01 00:01:00",
          AccountHashedPW: "new_client@new_client.co",
          AccountInternalNote: "new_client@new_client.co",
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};
