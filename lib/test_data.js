const aws_s3_url = process.env.NEXT_PUBLIC_AWS_S3_URL;

/* DONE - USERS */
export const test_admin_user = {
    notifs: {
        new_notes: [{note: 1, reply_note: 2}],
        new_sign_ins: [{sign_in: 1, user: 1}],
    }
};

export const test_client_user = {
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
