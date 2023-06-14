const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');

/**
 * @class Timer
 * 
 * @classdesc The Timer model shows information about a typical timer session.
 * 
 * @description A timer can only be created by the Producer and any user can connect to it in a session.
 * 
 * Instantiate -> Timer.build()
 * Create -> Timer.create(). Have to add its id to the project's timer ids array.
 * Get all -> Timer.findAll(). Have to find their projects and users.
 * Get one -> Timer.findOne(). Have to find its related project and user(s).
 * Update -> Timer.update({}, {}) and timer.save()
 * Delete -> timer.destroy(). Have to find its related project and user, and delete the timer id from their timers ids arrays. TODO: Maybe have each have a field of former timers ids?
 * 
 *  timer -> user none to many
 *  timer -> project one to one
 * 
 * @extends {Model}
 * 
 *  @property {number} id - The timer's id.
 *  @property {Date} timerCreatedTS - The timer's created timestamp.
 *  @property {number} timerCurrentSec - The timer's current time in seconds.
 *  @property {boolean} isTimerPaused - Is the timer paused?
 *  @property {boolean} isTimerCleared - Is the timer cleared?
 *  @property {boolean} isTimerRestarted - Is the timer restarted?
 *  @property {number} projectId - The timer's project it's set to.
 *  @property {Date} [timerUpdatedTS] - The recently-updated timer's ts.
 * @property {number[]} [usersIds] - The timer's users' ids.
 */
class Timer extends Model {
    /**
     * Get the project that a timer is related to.
     */
    getProjectForTimer() {};

    /**
     * Get all users that a timer is related to.
     */
    getAllUsersForTimer() {};

    /**
     * Add a timer id to a user's timers ids.
     */
    addTimerIdToUserTimersIds() {};

    /**
     * Add a timer id to a project's timers ids.
     */
    addTimerIdToProjectTimersIds() {};
}

Timer.init({
    timerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timerCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    timerCurrentSec: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isTimerPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isTimerCleared: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isTimerRestarted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    timerUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'timer',
    tableName: 'timers',
    timestamps: true
});

Timer.associate = (models) => {
    Timer.belongsTo(models.Project, {
        foreignKey: 'id',
        as: 'projectId'
    });
};

module.exports = Timer;
