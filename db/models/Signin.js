/**
 * The SignIn model is for information about sign ins
 * associated with a User.
 * 
 * Table: signins

    sign_in_id - varchar, primary - uuid-generated
    sign_in_headers - varchar
    sign_in_ts - timestamp, not null, default now()
    sign_out_ts - timestamp

    sign in -> user is one to one
*/

/**
 * Create a sign in entry.
 * 
 * @param {Object} db - The database object.
 * @param {Object} sign_in - The sign in object to be inserted.
 * 
 * @returns {Promise} - A promise that resolves to the inserted sign in.
 */
const createSignIn = (db, sign_in) => {
    return db.one(
        `INSERT INTO signins 
            (sign_in_id, sign_in_headers, sign_in_ts)
        VALUES 
            ($[sign_in_id], $[sign_in_headers], $[sign_in_ts])`, 
        sign_in
    );
};

/**
 * Get a sign in's info.
 * 
 * @param {Object} db - The database object.
 * @param {String} sign_in_id - The sign_in_id of the sign in to be retrieved.
 * 
 * @returns {Promise} - A promise that resolves to the retrieved sign in.
 */
const getSignIn = (db, sign_in_id) => {
    return db.one(
        `SELECT * FROM signins WHERE sign_in_id = $1`, 
        [sign_in_id]
    );
};

/**
 * Get all sign ins information for a user.
 * 
 * @param {Object} db - The database object.
 * @param {String} user_id - The user_id of the user to get sign ins for.
 * 
 * @returns {Promise} - A promise that resolves to the retrieved sign ins.
 */
const getAllSignInsPerUser = (db, user_id) => {
    return db.any(
        `SELECT * FROM signins WHERE user_id = $1`, 
        [user_id]
    );
};

/**
 * Get all sign in information from all users.
 * 
 * @param {Object} db - The database object.
 * 
 * @returns {Promise} - A promise that resolves to the retrieved sign ins.
 */
const getAllSignIns = (db) => {
    return db.any( `SELECT * FROM signins` );
};

module.exports = {
    createSignIn,
    getSignIn,
    getAllSignInsPerUser,
    getAllSignIns
};
