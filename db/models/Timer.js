/**
 * The Timer model shows information about a typical timer session.
 * 
 * Table: timers
 * 
 *  id - integer, primary key, serialized
 *  timer_created_ts - timestamp, not null, default now()
 *  timer_current_sec - integer, not null, default 0
 *  is_timer_paused - boolean, not null, default false
 *  is_timer_cleared - boolean, not null, default false
 *  is_timer_restarted - boolean, not null, default false
 * 
 *  timer -> user one to one
 *  timer -> project one to one
 */

/**
 * Create a new timer.
 * 
 * @param {Object} db - The database connection.
 * @param {Object} timer - The timer object to be created.
 * 
 * @returns {Promise} - A promise that resolves to the newly created timer.
 */
const createTimer = (db, timer) => {
    return db.one(
        `INSERT INTO timers 
            (timer_created_ts, timer_current_sec)
        VALUES 
            ($[timer_created_ts], $[timer_current_sec])`,
        timer
    );
};

/**
 * Get a timer by its id.
 * 
 * @param {Object} db - The database connection.
 * @param {Number} timer_id - The id of the timer to be retrieved.
 * 
 * @returns {Promise} - A promise that resolves to the retrieved timer.
 */
const getTimer = (db, timer_id) => {
    return db.one(
        `SELECT * FROM timers WHERE timer_id = $1`, 
        [timer_id]
    );
};

/**
 * Get info on all timers.
 * 
 * @param {Object} db - The database connection.
 * 
 * @returns {Promise} - A promise that resolves to all timers.
 */
const getAllTimers = (db) => {
    return db.any( `SELECT * FROM timers` );
};

/**
 * Update a timer.
 * 
 * @param {Object} db - The database connection.
 * @param {Object} timer - The timer object to be updated.
 * 
 * @returns {Promise} - A promise that resolves to the updated timer.
 */
const updateTimer = (db, timer) => {
    return db.one(
        `UPDATE timers 
        SET 
            timer_current_sec = $[timer_current_sec],
            is_timer_paused = $[is_timer_paused],
            is_timer_cleared = $[is_timer_cleared],
            is_timer_restarted = $[is_timer_restarted]
        WHERE timer_id = $[timer_id]`,
        timer
    );
};

module.exports = {
    createTimer,
    getTimer,
    getAllTimers,
    updateTimer
};
