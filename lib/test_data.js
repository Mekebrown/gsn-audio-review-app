const aws_s3_url = process.env.NEXT_PUBLIC_AWS_S3_URL;

/* DONE - USERS */
export const test_admin_user = {
    user_id: "test_999_id",
    user_email: "admin@admin.co",
    user_created_ts: "2023-01-01 00:01:00",
    user_hashed_pw: "the_admin_pw",
    user_media_list: [999999],
    last_sign_in_ts:  "2023-01-01 00:01:00",
    last_sign_out_ts:  "2023-01-01 00:01:00",
    user_internal_note: "ADMIN",
    user_discl_agreed_ts: "2023-01-01 00:01:00",
    is_discl_agreed: true,
    user_updated_field: "N/A",
    is_user_updated: true,
    user_updated_ts: "2023-01-01 00:01:00",
    user_role: "admin",
    notifs: {
        new_notes: [{note: 1, reply_note: 2}],
        new_sign_ins: [{sign_in: 1, user: 1}],
    }
};

export const test_client_user = {
    user_id: "test_111_id",
    user_email: "client@client.co",
    user_created_ts: "2023-01-01 00:01:00",
    user_media_list: [1],
    last_sign_in_ts: "2023-01-01 00:01:00",
    last_sign_out_ts: "2023-01-01 00:01:00",
    user_internal_note: "CLIENT",
    user_discl_agreed_ts: "2023-01-01 00:01:00",
    is_discl_agreed: true,
    user_updated_field: "media_list",
    is_user_updated: true,
    user_updated_ts: "2023-01-01 00:01:00",
    user_role: "client",
    user_hashed_pw: "the_client_pw",
    notes_ids: [1],
    media_ids: [1],
    projects_ids: [1],
    timers_ids: [1],
    sign_ins_ids: [1],
    notifs: {
        note_replies: [{note: 1, reply_note: 2}],
        assigned_media: 1,
    }
};

export const test_new_client_user = {
    user_id: "test_123_id",
    user_email: "new_client@new_client.co",
    user_created_ts: "2023-01-01 00:01:00",
    user_hashed_pw: "the_new_client_pw"
};

/* MEDIA */
export const test_new_media_work = {
    media_id: 1,
    project_id: 1,
    media_description: 'This is a test audio file.',
    media_type: 'audio',
    media_s3_url: `${aws_s3_url}/audio/mp3/audio.mp3`,
    media_created_ts: '2018-01-01 00:00:00'
};

export const test_active_media_work = {
    media_id: 1,
    project_id: 1,
    media_description: "(string)",
    media_type: "audio",
    media_s3_url: "(string)",
    media_created_ts: "01-01-2021 00:00:00",
    has_media_markers: true,
    media_markers_s3_csv_url: `${aws_s3_url}/files/csv/markers.csv`,
    media_updated_ts: "01-01-2021 00:00:00",
    note_ids: [1],
    users_ids: [1]
};

/* PROJECTS */
export const test_active_project = {
    project_id: 1,
    project_name: 'Test Project',
    project_created_ts: '2018-01-01 00:00:00',
    project_logo_s3_url: `${aws_s3_url}/images/png/logo.png`,
    project_description: 'This is a test project.',
    media_ids: [1],
};

export const test_new_project = {
    project_id: 2,
    project_name: 'Test Project',
    project_created_ts: '2018-01-01 00:00:00'
};

/* NOTES */
export const test_note_w_reply = {
    note_id: 1,
    user_id: 1,
    note_content: "(string)",
    media_id: 1,
    note_created_ts: "01-01-2021 00:00:00",
    note_deleted_ts: null,
    reply_note_ids: [2]
};

export const test_updated_note = {
    note_id: 1,
    user_id: 1,
    note_content: 'This is a test note.',
    note_updated_ts: "01-01-2021 00:00:00",
};

export const test_deleted_note = {
    note_id: 3,
    user_id: 1,
    note_content: 'This is a test note.',
    note_deleted_ts: "01-01-2021 00:00:00",
};

export const test_new_note = {
    note_id: 2,
    user_id: 1,
    note_content: 'This is a test note.',
    media_id: 1,
    note_created_ts: '2018-01-01 00:00:00'
};

/* TIMERS */
export const test_timer_w_users = {
    timer_id: 1,
    timer_created_ts: '2018-01-01 00:00:00',
    timer_current_sec: 0,
    project_id: 1,
    user_ids: [1]
};

export const test_active_timer_no_users = {
    timer_id: 1,
    timer_created_ts: '2018-01-01 00:00:00',
    timer_current_sec: 33,
    project_id: 1
};

export const test_new_timer_no_users = {
    timer_id: 1,
    timer_created_ts: '2018-01-01 00:00:00',
    timer_current_sec: 0,
    project_id: 1
};

/* SIGNINS */
export const test_admin_signin = {
    sign_in_id: 'huh-999',
    sign_in_ts: '2020-01-01 00:00:00',
    user_id: "test_999_id"
};

export const test_client_signin = {
    sign_in_id: 'huh-111',
    sign_in_ts: '2020-01-01 00:00:00',
    user_id: "test_111_id"
};
