const query_strings = {
    all_media_query_statement: [
        "SELECT",
            "id, project_name, media_desc", 
            "file_name, project_thumb, file_directory",
        "FROM media"
    ].join(" "),
    insert_note_query: [
        'INSERT INTO notes', 
            '(user_id, media_id, note_body, note_timestamp,',
            'last_retrieved, created_at, updated_at)',
        'VALUES ',
            '($1, $2, $3, $4, $5, $6, $7)',
        'RETURNING id',
    ].join(" "),
    media_upload_query_statement: [
        'INSERT INTO media',
            '(media_desc, file_name, media_type,', 
            'project_name, last_retrieved,',
            'file_directory, created_at)', 
        'VALUES ',
            '($1, $2, $3, $4, $5, $6, $7)'
    ].join(" "),
    notes_query_statement: [
        "SELECT",
            "id, note_body, note_timestamp",
        "FROM",
            "notes", 
        "WHERE media_id = $1", 
        "AND user_id = $2",
        "ORDER BY created_at", 
        "DESC LIMIT 5"
    ].join(" "),
    set_pw_query: [
        "INSERT INTO users",
            "(role, email, hashed_password,",
            "media_list, created_at)", 
        "VALUES",
            "($1, $2, $3, $4, now())", 
        "RETURNING id"
    ].join(" "),
    sign_in_query: [
        "SELECT * FROM users",
        "WHERE email = $1"
    ].join(" "),
    single_media_query_statement: [
        "SELECT * FROM media",
        "WHERE id = $1"
    ].join(" "),
    update_note_query: [
        'UPDATE notes ',
        'SET',
            'note_body = $1,',
            'note_timestamp = $2, ',
            'last_retrieved = $3,',
            'updated_at = $4 ',
        'WHERE id = $5 ',
        'AND media_id = $6',
    ].join(" "),
    update_user_sign_in_query: [
        "UPDATE users", 
        "SET header_info = $1,",
        "last_sign_in = $2",
        "WHERE email = $3",
        "RETURNING role"
    ].join(" "),
    update_users: [
        'UPDATE users',
        'SET contact_request = $1',
        'WHERE id = $2',
        'VALUES ($1, $2)'
    ].join(" "),
};

const users_fields = ``` 
    users.user_id,
    users.user_email,
    users.user_created_ts,
    users.user_media_list,
    users.last_sign_in_ts,
    users.last_sign_out_ts,
    users.user_internal_note,
    users.user_discl_agreed_ts,
    users.is_discl_agreed,
    users.user_role,
    users.user_hashed_pw
    ```;

const users_projects_info = ``` 
    users_projects.project_id,
    users_projects.project_name,
    users_projects.project_description,
    users_projects.project_media_list,
    users_projects.project_note_list,
    users_projects.project_timer_list,
    users_projects.project_user_list,
    users_projects.project_created_ts,
    users_projects.project_updated_ts,
    users_projects.project_updated_type,
    users_projects.project_settings,
    users_projects.project_is_deleted,
    users_projects.project_deleted_ts
    ```;

const users_media_info = ``` 
    users_media.media_id,
    users_media.media_name,
    users_media.media_description,
    users_media.media_type,
    users_media.media_url,
    users_media.media_note_list,
    users_media.media_created_ts,
    users_media.media_updated_ts,
    users_media.media_updated_type,
    users_media.media_settings,
    users_media.media_is_deleted,
    users_media.media_deleted_ts
    ```;

const users_notes_info = ``` 
    users_notes.note_id,
    users_notes.note_content,
    users_notes.note_created_ts,
    users_notes.note_updated_ts,
    users_notes.note_updated_type,
    users_notes.note_settings,
    users_notes.note_is_deleted,
    users_notes.note_deleted_ts,
    users_notes.note_reply_list,
    users_notes.note_media_list,
    users_notes.note_user_list
    ```;

const users_sign_ins_info = ``` 
    users_sign_ins.sign_in_id,
    users_sign_ins.sign_in_ts,
    users_sign_ins.sign_in_ip,
    users_sign_ins.sign_in_user_agent,
    users_sign_ins.sign_in_is_successful,
    users_sign_ins.sign_in_user_id,
    users_sign_ins.sign_in_user_role
    ```;

const get_user_info = {
    users_fields,
    users_projects_info,
    users_media_info,
    users_notes_info
};

const add_sign_ins_for_admin = "LEFT JOIN user_sign_ins ON users.user_id = user_sign_ins.sign_in_user_id";

module.exports = {
    query_strings,
    get_user_info,
    users_sign_ins_info,
    add_sign_ins_for_admin
};
