/**
 * The Media model is for information such as what project the media belongs to.
 * 
 * Table: media
 
    id - integer, primary key, serialized
    media_type - enum (audio, video, image), not null, default audio
    media_description - varchar
    has_media_markers - boolean, not null, default false
    media_markers_s3_csv_url - varchar - Will be a csv file
    media_s3_url - varchar, not null - Will be a media file
    media_created_ts - timestamp, not null, default now()
    media_updated_ts - timestamp

    media -> user is only created by an admin
            but is assigned to zero or more users
    media -> notes is zero to many
    media -> project is one to one
*/

/**
 * Create a media object. 
 * 
 * @param {Object} db - The database object.
 * @param {Object} media - The media object to be inserted.
 * 
 * @returns {Promise} - A promise that resolves to the inserted media work.
 */
const createMedia = (db, media) => {
    return db.one(
        `INSERT INTO media 
            (media_type, media_description, has_media_markers, media_markers_s3_csv_url, media_s3_url) 
        VALUES 
            ($[media_type], $[media_description], $[has_media_markers], $[media_markers_s3_csv_url], $[media_s3_url])`,
        media
    );
};

/**
 * Get a media work's information.
 * 
 * @param {Object} db - The database object.
 * @param {Number} id - The id of the media work.
 * 
 * @returns {Promise} - A promise that resolves to the media work.
 */
const getMedia = (db, id) => {
    return db.oneOrNone('SELECT * FROM media WHERE id = $1', [id]);
};

/**
 * Get all media works.
 * 
 * @param {Object} db - The database object.
 * 
 * @returns {Promise} - A promise that resolves to all media works.
 */
const getAllMedia = (db) => {
    return db.any('SELECT * FROM media');
};

/**
 * Update a media work's information.
 * 
 * @param {Object} db - The database object.
 * @param {Object} media - The media work's new information.
 * 
 * @returns {Promise} - A promise that resolves to the updated media work.
 */
const updateMedia = (db, media) => {
    return db.one(
        `UPDATE media 
        SET 
            media_type = $[media_type], media_description = $[media_description], has_media_markers = $[has_media_markers], media_markers_s3_csv_url = $[media_markers_s3_csv_url], media_s3_url = $[media_s3_url] 
        WHERE id = $[id]`,
        media
    );
};

/**
 * Delete a media work.
 * 
 * @param {Object} db - The database object.
 * @param {number} media_id - The id of the media work.
 * 
 * @returns {Promise} - A promise that resolves to the deleted media work.
 */
const deleteMedia = (db, media_id) => {
    return db.oneOrNone(
        `DELETE FROM media 
        WHERE id = $1`, 
        [media_id]
    );
};

module.exports = {
    createMedia,
    getMedia,
    getAllMedia,
    updateMedia,
    deleteMedia
};
