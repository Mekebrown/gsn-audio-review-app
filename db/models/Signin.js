const { DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');

/**
 * @class SignIn
 * 
 * @classdesc The SignIn model is for information about sign ins associated with a User.
 * 
 * Instantiate -> SignIn.build()
 * Create -> SignIn.create(). Have to add its id to a user's sign_in_ids array.
 * Get all -> SignIn.findAll(). Have to find their users.
 * Get one -> SignIn.findOne(). Have to find its related user.

    sign in -> user is one to one

    * @extends {Model}

    @property {number} sign_in_id - varchar, primary - uuid-generated
    @property {number} sign_in_ts - timestamp, not null, default now()
    @property {number} user_id - varchar, foreign key - users.user_id
    @property {number} [sign_out_ts] - timestamp
    @property {number} [sign_in_headers] - varchar
*/
class SignIn extends Model {
    /**
     * Get all sign ins information for a user.
     * 
     * @param {String} user_id - The user_id of the user to get sign ins for.
     * 
     * @returns {Object}
     */
    getAllSignInsPerUser(user_id) {};
    
    async getUserForSignIn(sign_in_id) {};
}

SignIn.init({
    signInId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'sign_in_id'
    },
    signInTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'sign_in_ts'
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id'
    },
    signOutTS: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'sign_out_ts'
    },
    signInHeaders: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'sign_in_headers'
    }
}, {
    sequelize,
    modelName: 'SignIn',
    tableName: 'signins',
    timestamps: true,
    createdAt: 'sign_in_ts',
    updatedAt: 'sign_out_ts',
    underscored: true
});

SignIn.associate = (models) => {
    SignIn.belongsTo(models.User, {
        foreignKey: 'user_id'
    });
};

module.exports = SignIn;
