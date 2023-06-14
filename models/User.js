const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');

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
 * Get notifs -> user.getUserNotifications(). Notifications to be calculated from notes and media dates. If the user is an admin, they will get notifications such as new notes and their replies, and new sign ins. If the user is a client, they will get notifications such as new replies of notes, new projects, and new media works.
 * 
 *  user -> sign ins    one to many
 *  user -> media       zero to many
 *  user -> notes       zero to many
 *  user -> projects    one to many
 *  user -> timers      zero to many
 *
 *  Future fields:
 *  userSettings (json)
 *  isUserDeleted (boolean) - If we want to keep users in the database
 *  userDeletedTS (timestamp) - If we want to keep users in the database
 * 
 * @extends {Model}
 * 
 * @property {string} userId - The user's UUIDV4-generated id.
 * @property {string} userEmail - The user's email. Unique.
 * @property {Date} userCreatedTS - The user's created timestamp.
 * @property {string} userNhashedPw - A Bcrypt-hashed password.
 * @property {string[]} [userNmediaNlist] - The user's media list array.
 * @property {Date} [lastSignInTS] - The user's last sign in ts.
 * @property {Date} [lastSignOutTS] - The user's last sign out ts.
 * @property {string} [userInternalNote] - The user's note from admin.
 * @property {Date} [userDisclAgreedTS] - Disclaimer agreement's ts.
 * @property {boolean} [isDisclAgreed] - Disclaimer agreed boolean.
 * @property {string} [userUpdatedNfield] - The recently-updated field.
 * @property {boolean} [isUserUpdated] - The "Was it updated?" answer.
 * @property {Date} [userUpdatedTS] - The recently-updated field's ts.
 * @property {string} [userNrole] - The user's role (admin, client).
 * @property {number[]} [notesIds] - The user's media list array.
 * @property {number[]} [projectsIds] - The user's media list array.
 * @property {number[]} [timersIds] - The user's media list array.
 * @property {number[]} [signInsIds] - The user's media list array.
 * @property {number[]} [mediaIds] - The user's media list array.
 */
class User extends Model {
    /**
     * Get a user. Items in json object. Everything associated with the userId will be retrieved. The join tables will be checked: userSignIns, userNmedia, userNotes, userProjects.
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
     * - amount of new users signed in by checking if the lastSignInTS is not null
     * - amount of new notes by adding new notes since this user's last sign in
     * 
     * @returns {Object} - A promise that resolves to the json object.
     */
    async getUserNotifications() {
        const requesting_user = await User.findByPk(this.userId);

        if (requesting_user.userNrole === 'client') {
            // Get the amount of notes replying to their notes, amount of new media added for them, and amount of new projects added for them.
        } else if (requesting_user.userNrole === 'admin') {
            // Get the amount of new users signed in by checking if the lastSignInTS is not null and amount of new notes by adding new notes since the admin's last sign in.
        }
    };
}

User.init({
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    userHashedPW: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userMediaList: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true, 
        defaultValue: "{}"
    },
    lastSignInTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    lastSignOutTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    userInternalNote: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userDisclAgreedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isDisclAgreed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    userUpdatedField: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isUserUpdated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    userUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    userRole: {
        type: DataTypes.ENUM('admin', 'client'),
        allowNull: false,
        defaultValue: 'client'
    },
    notesIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        references: {
            model: 'notes',
            key: 'id'
        }
    },
    projectsIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    timersIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        references: {
            model: 'timers',
            key: 'id'
        }
    },
    signInsIds: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        references: {
            model: 'signIns',
            key: 'id'
        }
    },
    mediaIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        references: {
            model: 'media',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
});

User.associate = (models) => {
    User.hasMany(models.Note, { 
        foreignKey: 'userId' 
    });
    User.hasMany(models.SignIn, { 
        foreignKey: 'userId' 
    });
    User.hasMany(models.Media, { 
        foreignKey: 'userId' 
    });
    User.hasMany(models.Project, { 
        foreignKey: 'userId' 
    });
    User.hasMany(models.Timer, { 
        foreignKey: 'userId' 
    });
};

module.exports = User;
