import Sequelize, { DataTypes, Model } from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

/**
 * @class Timer
 * 
 * @classdesc The Timer model shows information about a typical timer session.
 * 
 * @description A timer can only be created by the Producer and any profile can connect to it in a session.
 * 
 * Instantiate -> Timer.build()
 * Create -> Timer.create(). Have to add its id to the project's timer ids array.
 * Get all -> Timer.findAll(). Have to find their projects and profiles.
 * Get one -> Timer.findOne(). Have to find its related project an profile(s).
 * Update -> Timer.update({}, {}) and timer.save()
 * Delete -> timer.destroy(). Have to find its related project and profile, and delete the timer id from their timers ids arrays. TODO: Maybe have each have a field of former timers ids?
 * 
 *  timer -> profile none to many
 *  timer -> project one to one
 * 
 * @extends {Model}
 * 
 *  @property {number} id - The timer's id.
 *  @property {number} projectId - The timer's project it's set to.
 *  @property {Date} timerCreatedTS - The timer's created timestamp.
 *  @property {number} timerCurrentSec - The timer's current time in seconds.
 *  @property {boolean} [isTimerPaused] - Is the timer paused?
 *  @property {boolean} [isTimerCleared] - Is the timer cleared?
 *  @property {boolean} [isTimerRestarted] - Is the timer restarted?
 *  @property {Date} [timerUpdatedTS] - The recently-updated timer's ts.
 * @property {string[]} [profilesIds] - The timer's profile ids.
 */
class Timer extends Model {
    /**
     * Get the project that a timer is related to.
     */
    async getProjectForTimer() {};

    /**
     * Get all profiles that a timer was accessed from.
     */
    async getAllProfilesForTimer() {};

    /**
     * Add a timer id to an profile's timers ids.
     */
    async addTimerIdToProfileTimersIds() {};

    /**
     * Add a timer id to a project's timers ids.
     */
    async addTimerIdToProjectTimersIds() {};
}

Timer.init({
    id: {
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
        allowNull: true,
        defaultValue: false
    },
    isTimerCleared: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    isTimerRestarted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    timerUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    profilesIds: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        defaultValue: []
    }
}, {
    sequelize,
    modelName: 'timer',
    tableName: 'timers',
    timestamps: true,
    updatedAt: 'timerUpdatedTS',
    createdAt: 'timerCreatedTS'
});

Timer.associate = (models) => {
    Timer.belongsTo(models.Project);
    Timer.hasMany(models.Profile);
};

export { Timer };
