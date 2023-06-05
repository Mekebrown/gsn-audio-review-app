const { 
    get_user_info,
    users_sign_ins_info,
    add_sign_ins_for_admin 
} = require("../db/pg_pr_strings");

/**
 * The User model is for information such as the user's email.
 * User creation in the database is always done by an admin.
 * 
 * Table: users
 
    user_id - varchar, primary key - uuid-generated
    user_email - varchar, unique, not null
    user_created_ts - timestamp, not null, default now()
    user_media_list - integer[]
    last_sign_in_ts - timestamp
    last_sign_out_ts - timestamp
    user_internal_note - varchar
    user_discl_agreed_ts - timestamp
    is_discl_agreed - boolean, not null, default false
    user_role - enum (admin, client), not null, default client
    user_hashed_pw - varchar, unique, not null - bcrypt-generated

    user -> sign ins      one to many
    user -> media       zero to many
    user -> notes       zero to many
    user -> projects    one to many
    user -> timers      zero to many

    Note: Notifications to be calculated from notes and media dates

    Future fields:
    user_updated_ts (timestamp)
    user_updated_type (varchar)
    user_settings (json)
    is_user_deleted (boolean) - If we want to keep users in the database
    user_deleted_ts (timestamp) - If we want to keep users in the database
*/

/**
 * Create a new User.
 * 
 * @param {Object} db - The database object.
 * @param {Object} user - The user object to be created.
 * 
 * @returns {Promise} - A promise that resolves to the newly created user.
 */
const createUser = (db, user) => {
    return db.one(`
        INSERT INTO users
            (user_id, user_email, user_hashed_pw, user_created_ts, user_media_list, user_role, user_internal_note)
        VALUES
            ($[user_id], $[user_email], $[user_hashed_pw], $[user_created_ts], $[user_media_list], $[user_role], $[user_internal_note])`,
        user
    );
};

/**
 * Get a user. Items in json object. Everything associated with the user_id will be retrieved. The join tables will be checked: user_sign_ins, user_media, user_notes, user_projects.
 * 
 * If the requesting user role is of "client" then they will get:
 * - all projects they are added to
 * - all media they are added to
 * - all notes they have written
 * - all notes that have been replied to by them
 * 
 * If the requesting user role is of "admin" then they will get:
 * - all of the above as well as:
 * - the user's role
 * - all sign ins
 * - all sign outs
 * - all timers they participated in
 * - if they agreed to the disclaimer
 * - if they agreed to the disclaimer, when they agreed to it
 * 
 * @param {Object} db - The database object.
 * @param {string} user_id - The user_id of the user to be retrieved.
 * @param {string} requesting_user_role - The user_role of the user requesting the user.
 * 
 * @returns {Promise} - A promise that resolves to the user.
 */
const getUser = (db, user_id, requesting_user_role = "client") => {
    const user_to_retrieve_for_admin = {
        ...get_user_info,
        users_sign_ins_info,
        user_id
    };

    const user_to_retrieve_for_client = {
        ...get_user_info,
        user_id
    };

    if (requesting_user_role === "admin") {
        return db.one(
            `SELECT
                $[users_fields], 
                $[users_projects_info], 
                $[users_media_info], 
                $[users_notes_info], 
                $[users_sign_ins_info]
            FROM 
                users
            LEFT JOIN 
                user_projects 
            ON 
                users.user_id = user_projects.project_user_list
            LEFT JOIN 
                user_media 
            ON 
                users.user_id = user_media.media_user_list
            LEFT JOIN 
                user_notes 
            ON 
                users.user_id = user_notes.note_user_list
            ${add_sign_ins_for_admin}
            WHERE 
                users.user_id = $[user_id]`,
            user_to_retrieve_for_admin
        );
    } else {
        return db.one(`
            SELECT
                $[users_fields],
                $[users_projects_info], 
                $[users_media_info], 
                $[users_notes_info], 
            FROM 
                users
            LEFT JOIN 
                user_projects 
            ON 
                users.user_id = user_projects.project_user_list
            LEFT JOIN 
                user_media 
            ON 
                users.user_id = user_media.media_user_list
            LEFT JOIN 
                user_notes 
            ON 
                users.user_id = user_notes.note_user_list
            WHERE users.user_id = $[user_id]`,
            user_to_retrieve_for_client
        );
    }
};

/**
 * Get all users.
 * 
 * @param {Object} db - The database object.
 * 
 * @returns {Promise} - A promise that resolves to all users.
 */
const getAllUsers = (db) => {
    return db.any( `SELECT * FROM users` );
};

/**
 * Update a user.
 * 
 * @param {Object} db - The database object.
 * @param {Object} user - The user object to be updated.
 * 
 * @returns {Promise} - A promise that resolves to the updated user.
 */
const updateUser = (db, user) => {
    return db.one(`
        UPDATE users
        SET
            user_email = $[user_email],
            user_hashed_pw = $[user_hashed_pw],
            user_media_list = $[user_media_list],
            user_internal_note = $[user_internal_note],
            is_discl_agreed = $[is_discl_agreed],
            user_discl_agreed_ts = $[user_discl_agreed_ts]
        WHERE user_id = $[user_id]`,
        user
    );
};

/**
 * Delete a user.
 *  
 * @param {Object} db - The database object.
 * @param {string} user_id - The user_id of the user to be deleted.
 * 
 * @returns {Promise} - A promise that resolves to the deleted user.
 */
const deleteUser = (db, user_id) => {
    return db.one(`
        DELETE FROM users
        WHERE user_id = $1`,
        user_id
    );
};

/**
 * Get all user notifications. Items returned in a json object.
 * 
 * If the user has a role of "client" then they will get:
 * - amount of notes replying to their notes
 * - amount of new media added for them
 * - amount of new projects added for them
 * 
 * If the user has a role of "admin" then they will get:
 * - amount of new users signed in by checking if the last_sign_in_ts is not null
 * - amount of new notes by adding new notes since this user's last sign in
 * 
 * @param {Object} db - The database object.
 * @param {Object} user - The user object to be updated.
 * 
 * @returns {Promise} - A promise that resolves to the json object.
 */
const getUserNotifications = (db, user) => {
    if (user.user_role === "client") {
        // note_replies, new_media, new_projects
        return db.one(`
            SELECT
                (SELECT COUNT(*) FROM notes WHERE note_reply_to IN (SELECT note_id FROM notes WHERE note_user_id = $[user_id])) AS note_replies,
                (SELECT COUNT(*) FROM media WHERE media_user_id = $[user_id]) AS new_media,
                (SELECT COUNT(*) FROM projects WHERE project_user_id = $[user_id]) AS new_projects`,
            user
        );
    } else if (user.user_role === "admin") {
        // new_users, new_notes
        return db.one(`
            SELECT
                (SELECT COUNT(*) FROM users WHERE last_sign_in_ts IS NOT NULL) AS new_users,
                (SELECT COUNT(*) FROM notes WHERE note_created_ts > $[last_sign_in_ts]) AS new_notes`,
            user
        );
    }
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserNotifications
};
