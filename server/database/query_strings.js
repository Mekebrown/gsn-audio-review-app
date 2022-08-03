const media_upload_query_statement = `INSERT INTO media (
                                    media_desc, file_name, media_type, project_name, last_retrieved, file_directory,
                                    createdAt,
                                    updatedAt) 
                                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;                                      
const insert_note_query = `INSERT INTO notes ( 
                                    user_id, 
                                    media_id,
                                    note_body, 
                                    note_timestamp, 
                                    last_retrieved,
                                    createdAt,
                                    updatedAt) 
                                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;

const update_note_query = `UPDATE notes 
                                    SET note_body = $1,
                                    note_timestamp = $2, 
                                    last_retrieved = $3,
                                    updatedAt = $4 
                                    WHERE id = $5 
                                    AND media_id = $6`;

const media_query_statement = "SELECT * FROM media WHERE id = $1";

const ratings_query_statement = "SELECT * FROM ratings WHERE media_id = $1";

const notes_query_statement = `SELECT 
                              id, note_body, 
                              note_timestamp
                              FROM notes 
                              WHERE media_id = $1 
                              AND user_id = $2
                              ORDER BY createdAt 
                              DESC 
                              LIMIT 5
`;

const notes_query_statement_insert = `INSERT INTO notes (
                                    note_body, note_last_updated, note_timestamp, note_last_retrieved, user_id, media_id, note_created_on) VALUES ($1, $2, $3, $4, $5, $6, $7)`; 

const notes_query_statement_update = `UPDATE notes 
                                    SET note_body = $1, note_last_updated = $2, note_timestamp = $3, note_last_retrieved = $4 
                                    WHERE id = $5`;

const media_query_statement_retrieval = "SELECT notes_for_this_media FROM media WHERE id = $1";

const media_query_statement_insert = "INSERT INTO media (notes_for_this_media) VALUES ($1) WHERE id = $2";

module.exports = {
    media_upload_query_statement,
    media_query_statement,
    insert_note_query,
    update_note_query,
    ratings_query_statement,
    notes_query_statement,
    notes_query_statement_insert,
    notes_query_statement_update,
    media_query_statement_retrieval,
    media_query_statement_insert
}
