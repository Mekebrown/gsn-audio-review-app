import Sequelize, { DataTypes, Model } from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

/**
 * @class Signin
 * 
 * @classdesc The Signin model is for information about sign ins associated with a User.
 * 
 * Instantiate -> Signin.build()
 * Create -> Signin.create(). Have to add its id to a user's signInsIds array.
 * Get all -> Signin.findAll(). Have to find their users.
 * Get one -> Signin.findOne(). Have to find its related user.

    sign in -> user is one to one

* @extends {Model}

    @property {string} id - varchar, primary - uuid-generated
    @property {Date} signInTS - timestamp, not null, default now()
    @property {string} userId - varchar, foreign key - users.id
    @property {Date} [signOutTS] - timestamp
    @property {string} [signInHeaders] - varchar
*/
class Signin extends Model {
    async getAllSignInsPerUser() {};
    async getUserForSignIn() {};
}

Signin.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    signInTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    signOutTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    signInHeaders: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Signin',
    tableName: 'signins',
    timestamps: true,
    updatedAt: "signOutTS",
    createdAt: "signInTS"
});

Signin.associate = (models) => {
    Signin.belongsTo(models.User);
};

export { Signin };
