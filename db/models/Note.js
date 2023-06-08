/**
 * The Note model is for information such as a note's contents.
 * A note can be from any user and can be an original note or a reply to another note.
 * 
 * Table: notes

    id - integer, primary key, serialized
    note_content - varchar, not null
    note_created_ts - timestamp, not null, default now()
    note_updated_ts - timestamp
    note_deleted_ts - timestamp
    reply_to_note_id - integer

    note -> user one to one
    note -> media one to one
*/

/**
 * Create a new note.
 * 
 * @param {Object} db - The database connection.
 * @param {Object} note - The note object to be created.
 * 
 * @returns {Promise} - A promise that resolves to the newly created note.
 */
const createNote = (db, note) => {
    return db.one(
        `INSERT INTO notes 
            (note_content, note_created_ts)
        VALUES 
            ($[note_content], $[note_created_ts])`,
        note
    );
};

/**
 * Get a note by its id.
 * 
 * @param {Object} db - The database connection.
 * @param {Number} note_id - The id of the note to be retrieved.
 * 
 * @returns {Promise} - A promise that resolves to the retrieved note.
 */
const getNote = (db, note_id) => {
    return db.one(
        `SELECT * FROM notes WHERE note_id = $1`, 
        [note_id]
    );
};

/**
 * Get all notes.
 * 
 * @param {Object} db - The database connection.
 * 
 * @returns {Promise} - A promise that resolves to all notes.
 */
const getAllNotes = (db) => {
    return db.any( `SELECT * FROM notes` );
};

/**
 * Get all notes that are replies to a note.
 * 
 * @param {Object} db - The database connection.
 * @param {Number} note_id - The id of the note to get replies for.
 * 
 * @returns {Promise} - A promise that resolves to all replies to a note.
 */
const getAllRepliesPerNote = (db, note_id) => {
    return db.any(
        `SELECT * FROM notes WHERE reply_to_note_id = $1`,
        [note_id]
    );
};

/**
 * Update a note.
 * 
 * @param {Object} db - The database connection.
 * @param {Object} note - The note object to be updated.
 * 
 * @returns {Promise} - A promise that resolves to the updated note.
 */
const updateNote = (db, note) => {
    return db.one(
        `UPDATE notes 
        SET
            note_content = $[note_content],
            note_updated_ts = $[note_updated_ts]
        WHERE note_id = $[note_id]`,
        note
    );
};

/**
 * "Delete" a note. This means that the note is not actually deleted from the database, but the current timestamp is saved in note_deleted_ts.
 * 
 * @param {Object} db - The database connection.
 * @param {Number} note_id - The id of the note to be deleted.
 * 
 * @returns {Promise} - A promise that resolves to the deleted note.
 */
const deleteNote = (db, note_id) => {
    return db.one(
        `UPDATE notes 
        SET 
            note_deleted_ts = $1 
        WHERE note_id = $2`, 
        [new Date(), note_id]
    );
};

module.exports = {
    createNote,
    getNote,
    getAllNotes,
    getAllRepliesPerNote,
    updateNote,
    deleteNote
};
