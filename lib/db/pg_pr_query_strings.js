const queries = {
    update_users: [
            'UPDATE users',
            'SET contact_request = $1',
            'WHERE id = $2',
            'VALUES ($1, $2)'
    ].join(" "),
    media_upload_query_statement: [
        'INSERT INTO media (',
        'media_desc,', 
        'file_name,', 
        'media_type,', 
        'project_name,', 
        'last_retrieved,', 
        'file_directory,',
        'created_at)', 
        'VALUES ($1, $2, $3, $4, $5, $6, $7)'
    ].join(" "),
    insert_note_query: [
        'INSERT INTO notes (', 
        'user_id,', 
        'media_id,',
        'note_body, ',
        'note_timestamp, ',
        'last_retrieved,',
        'created_at,',
        'updated_at) ',
        'VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
    ].join(" "),
    update_note_query: [
        'UPDATE notes ',
        'SET note_body = $1,',
        'note_timestamp = $2, ',
        'last_retrieved = $3,',
        'updated_at = $4 ',
        'WHERE id = $5 ',
        'AND media_id = $6',
    ].join(" "),
    all_media_query_statement: [
        "SELECT id,",
        "project_name, media_desc", 
        "file_name, project_thumb,", 
        "file_directory",
        "FROM media"
    ].join(" "),
    single_media_query_statement: [
        "SELECT * FROM media",
        "WHERE id = $1"
    ].join(" "),
    ratings_query_statement: [
        "SELECT * FROM ratings",
        "WHERE media_id = $1"
    ].join(" "),
    notes_query_statement: [
        "SELECT id, note_body,", 
        "note_timestamp",
        "FROM notes", 
        "WHERE media_id = $1", 
        "AND user_id = $2",
        "ORDER BY created_at", 
        "DESC LIMIT 5"
    ].join(" "),
    update_user_login_query: [
        "UPDATE users", 
        "SET header_info = $1,",
        "last_login = $2",
        "WHERE email = $3",
        "RETURNING role"
    ].join(" "),
    login_query: [
        "SELECT * FROM users",
        "WHERE email = $1"
    ].join(" "),
    set_pw_query: [
        "INSERT INTO users (",
        "role,", 
        "email,", 
        "hashed_password,",
        "media_list,",
        "created_at)", 
        "VALUES ($1, $2, $3, $4, now())", 
        "RETURNING id"
    ].join(" "),
};

module.exports = queries;
