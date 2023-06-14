'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users', [
        {
          userId: "test_999_id",
          user_email: "admin@admin.co",
          user_hashed_pw: "the_admin_pw",
          user_internal_note: "ADMIN",
          user_role: "admin",
          last_sign_in_ts:  "2023-01-01 00:01:00",
        },
        {
          userId: "test_111_id",
          user_email: "client@client.co",
          user_created_ts: "2023-01-01 00:01:00",
          user_media_list: [1],
          user_hashed_pw: "the_client_pw",
          user_internal_note: "CLIENT",
          last_sign_in_ts:  "2023-01-01 00:01:00",
          user_discl_agreed_ts: "2023-01-01 00:01:00",
          is_discl_agreed: true,
          userUpdated_ts: "2023-01-01 00:01:00",
          userUpdated_field: "media_list",
          is_userUpdated: true,
        },
        {
          userId: "test_123_id",
          user_email: "new_client@new_client.co",
          user_hashed_pw: "the_new_client_pw",
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
