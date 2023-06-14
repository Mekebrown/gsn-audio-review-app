const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');

/**
 * @class SignIn
 * 
 * @classdesc The SignIn model is for information about sign ins associated with a User.
 * 
 * Instantiate -> SignIn.build()
 * Create -> SignIn.create(). Have to add its id to a user's signInsIds array.
 * Get all -> SignIn.findAll(). Have to find their users.
 * Get one -> SignIn.findOne(). Have to find its related user.

    sign in -> user is one to one

    * @extends {Model}

    @property {number} signInId - varchar, primary - uuid-generated
    @property {number} signInTS - timestamp, not null, default now()
    @property {number} userId - varchar, foreign key - users.userId
    @property {number} [signOutTS] - timestamp
    @property {number} [signInHeaders] - varchar
*/
class SignIn extends Model {
    /**
     * Get all sign ins information for a user.
     * 
     * @param {String} userId - The userId of the user to get sign ins for.
     * 
     * @returns {Object}
     */
    getAllSignInsPerUser(userId) {};
    
    async getUserForSignIn(signInId) {};
}

SignIn.init({
    signInId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    signInTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
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
    modelName: 'SignIn',
    tableName: 'signins',
    timestamps: true
});

SignIn.associate = (models) => {
    SignIn.belongsTo(models.User, {
        foreignKey: 'userId'
    });
};

module.exports = SignIn;
