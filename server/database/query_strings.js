const media_upload_query_statement = `INSERT INTO media (
                                    media_desc, 
                                    file_name, 
                                    media_type, 
                                    project_name, 
                                    last_retrieved, 
                                    file_directory,
                                    created_at) 
                                    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

const insert_note_query = `INSERT INTO notes ( 
                                    user_id, 
                                    media_id,
                                    note_body, 
                                    note_timestamp, 
                                    last_retrieved,
                                    created_at,
                                    updated_at) 
                                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;

const update_note_query = `UPDATE notes 
                                    SET note_body = $1,
                                    note_timestamp = $2, 
                                    last_retrieved = $3,
                                    updated_at = $4 
                                    WHERE id = $5 
                                    AND media_id = $6`;

const all_media_query_statement = "SELECT id, project_name, media_desc, file_name, project_thumb, file_directory FROM media";

const single_media_query_statement = "SELECT * FROM media WHERE id = $1";

const ratings_query_statement = "SELECT * FROM ratings WHERE media_id = $1";

const notes_query_statement = `SELECT 
                              id, note_body, 
                              note_timestamp
                              FROM notes 
                              WHERE media_id = $1 
                              AND user_id = $2
                              ORDER BY created_at 
                              DESC 
                              LIMIT 5
`;

const update_user_login_query = `UPDATE users 
                                    SET header_info = $1,
                                    last_login = $2
                                WHERE username = $3
                                RETURNING role`;

const login_query = `SELECT * FROM users WHERE username = $1`;

const set_pw_query = `INSERT INTO users (
                    role, 
                    username, 
                    hashed_password,
                    media_list,
                    created_at) 
                    VALUES ($1, $2, $3, $4, now()) 
                    RETURNING id`;

const contact_query_statement = `UPDATE users
                                    SET contact_request = $1
                                    WHERE id = $2
                                    VALUES ($1, $2)`;

module.exports = {
    all_media_query_statement,
    contact_query_statement,
    media_upload_query_statement,
    single_media_query_statement,
    insert_note_query,
    login_query,
    update_note_query,
    ratings_query_statement,
    notes_query_statement,
    update_user_login_query,
    set_pw_query
};
