import Sequelize, { DataTypes, Model } from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

/**
 * @class Account
 * 
 * @classdesc The Account model is for information such as the account's assigned media works.
 * 
 * @description An Account's creation in the database is always done by an admin.
 * 
 * Instantiate -> Account.build()
 * Create -> Account.create() and Account.bulkCreate()
 * Get all -> Account.findAll()
 * Get one -> Account.findOne(). Add an indicator for the requestor's role.
 * Update -> Account.update({}, {}) and Account.save()
 * Delete -> Account.destroy()
 * Get notifs -> Account.getAccountNotifications(). Notifications to be calculated from notes and media dates. If the Account is for an admin, the admin will see notifications such as new notes and their replies, and new user sign ins. If the Account is for a client, they will get notifications such as new replies of notes, new projects, and new media works.
 * 
 *  Account -> media       zero to many
 *  Account -> user       one to one
 *  Account -> notes       zero to many
 *  Account -> projects    one to many
 *  Account -> timers      zero to many
 *
 *  Future fields:
 *  accountSettings (json)
 *  isAccountDeleted (boolean) - If we want to keep Accounts in the database
 *  accountDeletedTS (timestamp) - If we want to keep Accounts in the database
 * 
 * @extends {Model}
 * 
 * @property {string} id - The Account's UUIDV4-generated id.
 * @property {string} userId - The Account's user's id.
 * @property {Date} accountCreatedTS - The Account's created timestamp.
 * @property {string} accountHashedPW - A Bcrypt-hashed password.
 * @property {number[]} [accountMediaList] - The Account's media list array.
 * @property {Date} [lastSignInTS] - The Account's last sign in ts.
 * @property {Date} [lastSignOutTS] - The Account's last sign out ts.
 * @property {string} [accountInternalNote] - Admin notes.
 * @property {Date} [accountDisclAgreedTS] - Disclaimer agreement's ts.
 * @property {boolean} [isDisclAgreed] - Disclaimer agreed boolean.
 * @property {string} [accountUpdatedField] - The recently-updated field.
 * @property {boolean} [isAccountUpdated] - The "Was it updated?" answer.
 * @property {Date} [accountUpdatedTS] - The recently-updated field's ts.
 * @property {string} accountRole - The Account's role (admin, client).
 * @property {number[]} [notesIds] - The Account's media list array.
 * @property {number[]} [projectsIds] - The Account's media list array.
 * @property {number[]} [timersIds] - The Account's media list array.
 * @property {string} [accountHeaders] - The Account's header details from latest sign in.
 */
class Account extends Model {
    /**
     * Get a Account. Items in json object. Everything associated with the user email and password will be retrieved. The join tables will be checked: , useMedia, AccountNotes, AccountProjects.
     * 
     * If the requesting Account role is of "client" then they will get:
     * - all projects they are added to
     * - all media they are added to
     * - all notes they have written
     * - all notes that have been replied to by them
     * 
     * If the requesting Account role is of "admin" then they will get:
     * - all of the above as well as:
     * - the Account's role
     * - the last sign in
     * - the last sign out
     * - all timers they participated in
     * - if they agreed to the disclaimer
     * - if they agreed to the disclaimer, when they agreed to it
     */
    getAcctInfo() {
        /*For a client, get the email, media list, and projects list.
        For an admin, get the email, media list, projects list, latest sign in, latest sign out, and if they agreed to the disclaimer.*/
    };

    /**
     * Get all Account notifications. Items returned in a json object.
     * 
     * If the Account has a role of "client" then they will get:
     * - amount of notes replying to their notes
     * - amount of new media added for them
     * - amount of new projects added for them
     * 
     * If the Account has a role of "admin" then they will get:
     * - amount of new Accounts signed in by checking if the lastSignInTS is not null
     * - amount of new notes by adding new notes since this Account's last sign in
     */
    async getAccountNotifications() {
        if (this.AccountRole === 'client') {
            /* Get the amount of notes replying to their notes, amount of new media added for them, and amount of new projects added for them.*/
        } else if (this.AccountRole === 'admin') {
            /* Get the amount of new Accounts signed in by checking if the lastSignInTS is not null and amount of new notes by adding new notes since the admin's last sign in.*/
        }
    };
}

Account.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    accountCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    accountHashedPW: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        get() {
            // https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/#getters
            const value = this.getDataValue('AccountHashedPW');

            return unBcryptIt(value);
        },
        set(value) {
            // https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/#setters
            this.setDataValue('password', bcryptIt(value));
        }
    },
    accountMediaList: {
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
    accountInternalNote: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accountDisclAgreedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isDisclAgreed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    accountUpdatedField: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isAccountUpdated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    accountUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    accountRole: {
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
    accountHeaders: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Account',
    tableName: 'Accounts',
    timestamps: true,
    updatedAt: "AccountUpdatedTS",
    createdAt: 'AccountCreatedTS'
});

Account.associate = (models) => {
    Account.hasMany(models.Note);
    Account.hasOne(models.User);
    Account.hasMany(models.Media);
    Account.hasMany(models.Project);
    Account.hasMany(models.Timer);
};

export { Account };
