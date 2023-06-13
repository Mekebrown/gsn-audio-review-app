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
 * Create -> Timer.create(). Have to add its id to the project's timer_ids array.
 * Get all -> Timer.findAll(). Have to find their projects and users.
 * Get one -> Timer.findOne(). Have to find its related project and user(s).
 * Update -> Timer.update({}, {}) and timer.save()
 * Delete -> timer.destroy(). Have to find its related project and user, and delete the timer_id from their timers_ids arrays. TODO: Maybe have each have a field of former_timers_ids?
 * 
 *  timer -> user none to many
 *  timer -> project one to one
 * 
 * @extends {Model}
 * 
 *  @property {number} timer_id - The timer's id.
 *  @property {Date} timer_created_ts - The timer's created timestamp.
 *  @property {number} timer_current_sec - The timer's current time in seconds.
 *  @property {boolean} is_timer_paused - Is the timer paused?
 *  @property {boolean} is_timer_cleared - Is the timer cleared?
 *  @property {boolean} is_timer_restarted - Is the timer restarted?
 *  @property {number} project_id - The timer's project it's set to.
 *  @property {Date} [timer_updated_ts] - The recently-updated timer's ts.
 * @property {number[]} [users_ids] - The timer's users' ids.
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
        allowNull: false,
        field: 'project_id'
    },
    timerCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: 'timer_created_ts'
    },
    timerCurrentSec: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'timer_current_sec'
    },
    isTimerPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_timer_paused'
    },
    isTimerCleared: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_timer_cleared'
    },
    isTimerRestarted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_timer_restarted'
    },
    timerUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'timer_updated_ts'
    }
}, {
    sequelize,
    modelName: 'timer',
    tableName: 'timers',
    timestamps: true,
    createdAt: 'timer_created_ts',
    updatedAt: 'timer_updated_ts',
    underscored: true
});

Timer.associate = (models) => {
    Timer.belongsTo(models.Project, {
        foreignKey: 'project_id',
        as: 'project'
    });
};

module.exports = Timer;
