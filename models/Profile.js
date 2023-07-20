import Sequelize, { DataTypes, Model } from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

/**
 * @class Profile
 * 
 * @classdesc The Profile model is for information such as the profile's assigned media works.
 * 
 * @description An Profile's creation in the database is always done by an admin.
 * 
 * Instantiate -> Profile.build()
 * Create -> Profile.create() and Profile.bulkCreate()
 * Get all -> Profile.findAll()
 * Get one -> Profile.findOne(). Add an indicator for the requestor's role.
 * Update -> Profile.update({}, {}) and Profile.save()
 * Delete -> Profile.destroy()
 * Get notifs -> Profile.getProfileNotifications(). Notifications to be calculated from notes and media dates. If the Profile is for an admin, the admin will see notifications such as new notes and their replies, and new user sign ins. If the Profile is for a client, they will get notifications such as new replies of notes, new projects, and new media works.
 * 
 *  Profile -> media       zero to many
 *  Profile -> user       one to one
 *  Profile -> notes       zero to many
 *  Profile -> projects    one to many
 *  Profile -> timers      zero to many
 *
 *  Future fields:
 *  profileSettings (json)
 *  isProfileDeleted (boolean) - If we want to keep Profiles in the database
 *  profileDeletedTS (timestamp) - If we want to keep Profiles in the database
 * 
 * @extends {Model}
 * 
 * @property {string} id - The Profile's UUIDV4-generated id.
 * @property {string} userId - The Profile's user's id.
 * @property {Date} profileCreatedTS - The Profile's created timestamp.
 * @property {string} profileHashedPW - A Bcrypt-hashed password.
 * @property {number[]} [profileMediaList] - The Profile's media list array.
 * @property {Date} [lastSignInTS] - The Profile's last sign in ts.
 * @property {Date} [lastSignOutTS] - The Profile's last sign out ts.
 * @property {string} [profileInternalNote] - Admin notes.
 * @property {Date} [profileDisclAgreedTS] - Disclaimer agreement's ts.
 * @property {boolean} [isDisclAgreed] - Disclaimer agreed boolean.
 * @property {string} [profileUpdatedField] - The recently-updated field.
 * @property {boolean} [isProfileUpdated] - The "Was it updated?" answer.
 * @property {Date} [profileUpdatedTS] - The recently-updated field's ts.
 * @property {string} profileRole - The Profile's role (admin, client).
 * @property {number[]} [notesIds] - The Profile's media list array.
 * @property {number[]} [projectsIds] - The Profile's media list array.
 * @property {number[]} [timersIds] - The Profile's media list array.
 * @property {string} [profileHeaders] - The Profile's header details from latest sign in.
 */
class Profile extends Model {
    /**
     * Get an Profile. Items in json object. Everything associated with the user email and password will be retrieved. The join tables will be checked: ProfileMedia, ProfileNotes, ProfileProjects.
     * 
     * If the requesting Profile role is of "client" then they will get:
     * - all projects they are added to
     * - all media they are added to
     * - all notes they have written
     * - all notes that have been replied to by them
     * 
     * If the requesting Profile role is of "admin" then they will get:
     * - all of the above as well as:
     * - the Profile's role
     * - the last sign in
     * - the last sign out
     * - all timers they participated in
     * - if they agreed to the disclaimer
     * - if they agreed to the disclaimer, when they agreed to it
     */
    getProfileInfo() {
        /*For a client, get the email, media list, and projects list.
        For an admin, get the email, media list, projects list, latest sign in, latest sign out, and if they agreed to the disclaimer.*/
    };

    /**
     * Get all Profile notifications. Items returned in a json object.
     * 
     * If the Profile has a role of "client" then they will get:
     * - amount of notes replying to their notes
     * - amount of new media added for them
     * - amount of new projects added for them
     * 
     * If the Profile has a role of "admin" then they will get:
     * - amount of new Profiles signed in by checking if the lastSignInTS is not null
     * - amount of new notes by adding new notes since this Profile's last sign in
     */
    async getProfileNotifications() {
        if (this.ProfileRole === 'client') {
            /* Get the amount of notes replying to their notes, amount of new media added for them, and amount of new projects added for them.*/
        } else if (this.ProfileRole === 'admin') {
            /* Get the amount of new Profiles signed in by checking if the lastSignInTS is not null and amount of new notes by adding new notes since the admin's last sign in.*/
        }
    };
}

Profile.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    profileCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    profileHashedPW: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        get() {
            // https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/#getters
            const value = this.getDataValue('profileHashedPW');

            return unBcryptIt(value);
        },
        set(value) {
            // https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/#setters
            this.setDataValue('password', bcryptIt(value));
        }
    },
    profileMediaList: {
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
    profileInternalNote: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profileDisclAgreedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isDisclAgreed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    profileUpdatedField: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isProfileUpdated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    profileUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    profileRole: {
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
    profileHeaders: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Profile',
    tableName: 'Profiles',
    timestamps: true,
    updatedAt: "ProfileUpdatedTS",
    createdAt: 'ProfileCreatedTS'
});

Profile.associate = (models) => {
    Profile.hasMany(models.Note);
    Profile.hasOne(models.User);
    Profile.hasMany(models.Media);
    Profile.hasMany(models.Project);
    Profile.hasMany(models.Timer);
};

export { Profile };
