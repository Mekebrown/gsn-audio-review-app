const media_upload_query_statement = `INSERT INTO media 
                                    (user_id, media_desc, file_name, media_type, project_name, media_uploaded_on, file_directory) 
                                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
const media_query_statement = "SELECT * FROM media WHERE media_id = ?";

const ratings_query_statement = "SELECT * FROM ratings WHERE media_id = ?";

const notes_query_statement = `SELECT 
                              note_id, note_body, note_last_updated, note_timestamp, note_last_retrieved, note_is_deleted
                              FROM notes 
                              WHERE media_id = ? 
                              AND note_is_deleted = 'no' 
                              ORDER BY note_last_retrieved 
                              DESC 
                              LIMIT 5
`;

const notes_query_statement_insert = `INSERT INTO notes (
                                    note_body, note_last_updated, note_timestamp, note_last_retrieved, user_id, media_id, note_created_on) VALUES (?, ?, ?, ?, ?, ?, ?)`; 

const notes_query_statement_update = `UPDATE notes 
                                    SET note_body = ?, note_last_updated = ?, note_timestamp = ?, note_last_retrieved = ? 
                                    WHERE note_id = ?`;

const media_query_statement_retrieval = "SELECT notes_for_this_media FROM media WHERE media_id = ?";

const media_query_statement_insert = "INSERT INTO media (notes_for_this_media) VALUES (?) WHERE media_id = ?";

module.exports = {
    media_upload_query_statement,
    media_query_statement,
    ratings_query_statement,
    notes_query_statement,
    notes_query_statement_insert,
    notes_query_statement_update,
    media_query_statement_retrieval,
    media_query_statement_insert
}
