import { DataTypes, Model } from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

/**
 * @class User
 * 
 * @classdesc The User model is for the Auth and NextAuth JS credentials.
 * 
 * @description A User's creation in the database is always done by an admin.
 * 
 * Instantiate -> User.build()
 * Create -> User.create()
 * Get all -> User.findAll()
 * Get one -> User.findOne(). Add an indicator for the requestor's role.
 * Update -> User.update({}, {}) and User.save()
 * Delete -> User.destroy()
 * 
 * User -> profile       one to many
 * 
 * Note: Everything associated with the user details such as the notes, media, etc. will be retrieved from the associated Profile.
 * 
 * @extends {Model}
 * 
 * @property {string} id - The user's UUIDV4-generated id
 * @property {string} [name] - S/E
 * @property {string} [email] - S/E
 * @property {Date} [email_verified] - When the email was verified during their sign up
 * @property {string} [image] - The user's thumbnail, if this is to be used
 */
class User extends Model {
    /**
     * Get a User's name and image url associated with the id.
     */
    async getUserNameImage() { };

    /**
     * Get all Profile info associated with the id.
     */
    async getUserProfilesWithAllInfo() { };

    /**
     * Get all Profile ids ONLY, associated with the user's id.
     */
    async getUserProfileIDs() { };
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email_verified: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    updatedAt: "UserUpdatedTS",
    createdAt: 'UserCreatedTS'
});

User.associate = (models) => {
    User.hasMany(models.Profile);
};

export { User };
