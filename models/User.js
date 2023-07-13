import Sequelize, { DataTypes, Model } from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

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
 * @property {string} id - The user's UUIDV4-generated id.
 * @property {string} [name] - The user's name.
 * @property {string} email - The user's email. Unique.
 * @property {Date} emailVerified - The datetime of verification.
 * @property {string} [image] - The user's profile image.
 * @property {Date} userCreatedTS - The user's created timestamp.
 * @property {string} userHashedPW - A Bcrypt-hashed password.
 * @property {number[]} [userMediaList] - The user's media list array.
 * @property {Date} [lastSignInTS] - The user's last sign in ts.
 * @property {Date} [lastSignOutTS] - The user's last sign out ts.
 * @property {string} [userInternalNote] - Admin notes.
 * @property {Date} [userDisclAgreedTS] - Disclaimer agreement's ts.
 * @property {boolean} [isDisclAgreed] - Disclaimer agreed boolean.
 * @property {string} [userUpdatedField] - The recently-updated field.
 * @property {boolean} [isUserUpdated] - The "Was it updated?" answer.
 * @property {Date} [userUpdatedTS] - The recently-updated field's ts.
 * @property {string} userRole - The user's role (admin, client).
 * @property {number[]} [notesIds] - The user's media list array.
 * @property {number[]} [projectsIds] - The user's media list array.
 * @property {number[]} [timersIds] - The user's media list array.
 * @property {string[]} [signInsIds] - The user's media list array.
 */
class User extends Model {
    /**
     * Get a user. Items in json object. Everything associated with the id will be retrieved. The join tables will be checked: userSignIns, userNmedia, userNotes, userProjects.
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
     */
    getAcctInfo() {
        /*For a client, get the email, media list, and projects list.
        For an admin, get the email, media list, projects list, sign ins, sign outs, and if they agreed to the disclaimer.*/
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
     */
    async getUserNotifications() {
        if (this.userRole === 'client') {
            /* Get the amount of notes replying to their notes, amount of new media added for them, and amount of new projects added for them.*/
        } else if (this.userRole === 'admin') {
            /* Get the amount of new users signed in by checking if the lastSignInTS is not null and amount of new notes by adding new notes since the admin's last sign in.*/
        }
    };
}

User.init({
    // id: {
    //     type: DataTypes.UUID,
    //     defaultValue: DataTypes.UUIDV4,
    //     primaryKey: true
    // },
    // name: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //     defaultValue: 'client',
    // },
    // email: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     isEmail: true,
    //     unique: "email"
    // },
    // emailVerified: {
    //     type: DataTypes.DATE,
    //     allowNull: false
    // },
    // image: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    userCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    userHashedPW: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        get() {
            // https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/#getters
            const value = this.getDataValue('userHashedPW');

            return unBcryptIt(value);
        },
        set(value) {
            // https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/#setters
            this.setDataValue('password', bcryptIt(value));
        }
    },
    userMediaList: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true, 
        defaultValue: []
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
        allowNull: true,
        defaultValue: false
    },
    userUpdatedField: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isUserUpdated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
        defaultValue: []
    },
    projectsIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: []
    },
    timersIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: []
    },
    signInsIds: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
        defaultValue: []
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    updatedAt: "userUpdatedTS",
    createdAt: 'userCreatedTS'
});

User.associate = (models) => {
    User.hasMany(models.Note);
    User.hasMany(models.Signin);
    User.hasMany(models.Media);
    User.hasMany(models.Project);
    User.hasMany(models.Timer);
};

export { User };
