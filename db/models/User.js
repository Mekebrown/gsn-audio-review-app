const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');
const { 
    get_user_info,
    users_sign_ins_info,
    add_sign_ins_for_admin 
} = require("../pgp_strings");

/**
 * @class User
 * 
 * @classdesc The User model is for information such as the user's email.
 * 
 * @description A User's creation in the database is always done by an admin.
 * 
 * Instantiate -> User.build()
 * Create -> User.create() and User.bulkCreate()
 * Get all -> User.findAll()
 * Get one -> User.findOne(). Add an indicator for the requestor's role.
 * Update -> User.update({}, {}) and user.save()
 * Delete -> user.destroy()
 * Get notifs -> user.getUserNotifications(). Notifications to be calculated from notes and media dates.
 * 
 *  user -> sign ins    one to many
 *  user -> media       zero to many
 *  user -> notes       zero to many
 *  user -> projects    one to many
 *  user -> timers      zero to many
 *
 *  Future fields:
 *  user_settings (json)
 *  is_user_deleted (boolean) - If we want to keep users in the database
 *  user_deleted_ts (timestamp) - If we want to keep users in the database
 * 
 * @extends {Model}
 * 
 * @property {string} id - The user's UUIDV4-generated id.
 * @property {string} user_email - The user's email. Unique.
 * @property {Date} user_created_ts - The user's created timestamp.
 * @property {string[]} [user_media_list] - The user's media list array.
 * @property {Date} [last_sign_in_ts] - The user's last sign in timestamp.
 * @property {Date} [last_sign_out_ts] - The user's last sign out timestamp.
 * @property {string} [user_internal_note] - The user's note from admin.
 * @property {Date} [user_discl_agreed_ts] - The disclaimer agreement's ts.
 * @property {boolean} [is_discl_agreed] - The user's disclaimer agreed boolean.
 * @property {string} [user_updated_field] - The recently-updated field.
 * @property {boolean} [is_user_updated] - The "Was it updated?" answer.
 * @property {Date} [user_updated_ts] - The recently-updated field's timestamp.
 * @property {string} [user_role] - The user's role (admin, client).
 * @property {string} user_hashed_pw - The user's Bcrypt-hashed password.
 * @property {number[]} [notes_ids] - The user's media list array.
 * @property {number[]} [projects_ids] - The user's media list array.
 * @property {number[]} [timers_ids] - The user's media list array.
 * @property {number[]} [sign_ins_ids] - The user's media list array.
 * @property {number[]} [media_ids] - The user's media list array.
 */
class User extends Model {
    /**
     * Get a user. Items in json object. Everything associated with the user_id will be retrieved. The join tables will be checked: user_sign_ins, user_media, user_notes, user_projects.
     * 
     * If the requesting user role is of "client" then they will get:
     * - all projects they are added to
     * - all media they are added to
     * - all notes they have written
     * - all notes that have been replied to by them
     * 
     * If the requesting user role is of "admin" then they will get:
     * - all of the above as well as:
     * - the user's role
     * - all sign ins
     * - all sign outs
     * - all timers they participated in
     * - if they agreed to the disclaimer
     * - if they agreed to the disclaimer, when they agreed to it
     * 
     * @returns {Object} - A promise that resolves to the user.
     */
    getAcctInfo() {
        // For a client, get the email, media list, and projects list.
        // For an admin, get the email, media list, projects list, sign ins, sign outs, and if they agreed to the disclaimer.
    };

    /**
     * Get all user notifications. Items returned in a json object.
     * 
     * If the user has a role of "client" then they will get:
     * - amount of notes replying to their notes
     * - amount of new media added for them
     * - amount of new projects added for them
     * 
     * If the user has a role of "admin" then they will get:
     * - amount of new users signed in by checking if the last_sign_in_ts is not null
     * - amount of new notes by adding new notes since this user's last sign in
     * 
     * @returns {Object} - A promise that resolves to the json object.
     */
    getUserNotifications() {
        // For a client, get the amount of notes replying to their notes, amount of new media added for them, and amount of new projects added for them.
        // For an admin, get the amount of new users signed in by checking if the last_sign_in_ts is not null and amount of new notes by adding new notes since this user's last sign in.
    };
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        field: 'user_email'
    },
    userMediaList: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true, 
        field: 'user_media_list'
    },
    lastSignInTS: {
        type: DataTypes.DATE,
        allowNull: true, 
        field: 'last_sign_in_ts'
    },
    lastSignOutTS: {
        type: DataTypes.DATE,
        allowNull: true, 
        field: 'last_sign_out_ts'
    },
    userInternalNote: {
        type: DataTypes.STRING,
        allowNull: true, 
        field: 'user_internal_note'
    },
    userDisclAgreedTS: {
        type: DataTypes.DATE,
        allowNull: true, 
        field: 'user_discl_agreed_ts'
    },
    isDisclAgreed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
        field: 'is_discl_agreed'
    },
    userUpdatedField: {
        type: DataTypes.STRING,
        allowNull: true, 
        field: 'user_updated_field'
    },
    isUserUpdated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
        field: 'is_user_updated'
    },
    userRole: {
        type: DataTypes.ENUM('admin', 'client'),
        allowNull: false,
        defaultValue: 'client', 
        field: 'user_role'
    },
    userHashedPW: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        field: 'user_hashed_pw'
    },
    notesIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true, 
        field: 'notes_ids',
        references: {
            model: 'notes',
            key: 'id'
        }
    },
    projectsIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true, 
        field: 'projects_ids',
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    timersIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true, 
        field: 'timers_ids',
        references: {
            model: 'timers',
            key: 'id'
        }
    },
    signInsIds: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        field: 'sign_ins_ids',
        references: {
            model: 'sign_ins',
            key: 'id'
        }
    },
    mediaIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true, 
        field: 'media_ids',
        references: {
            model: 'media',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'user_created_ts',
    updatedAt: 'user_updated_ts'
});

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserNotifications,
    User
};
