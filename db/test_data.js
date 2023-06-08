const aws_s3_url = process.env.NEXT_PUBLIC_AWS_S3_URL;

export const test_user = {
    id: "test_765_id",
    email: "test@user.email",
    created_ts: "2018-01-01 00:00:00",
    media_list: "[1]",
    last_sign_in_ts: "2018-01-01 00:00:00",
    internal_note: "A test user's internal note.",
    hashed_pw: "erser_hashtest_u_s_w"
};

export const test_media = {
    id: 1,
    description: 'This is a test audio file.',
    has_markers: true,
    markers_s3_csv_url: `${aws_s3_url}/files/csv/markers.csv`,
    s3_url: `${aws_s3_url}/audio/mp3/audio.mp3`,
    created_ts: '2018-01-01 00:00:00'
};

export const test_project = {
    id: 1,
    name: 'Test Project',
    logo_s3_url: `${aws_s3_url}/images/png/logo.png`,
    description: 'This is a test project.',
    created_ts: '2018-01-01 00:00:00'
};

export const test_note = {
    id: 1,
    content: 'This is a test note.',
    created_ts: '2018-01-01 00:00:00'
};

export const test_timer = {
    id: 1,
    created_ts: '2018-01-01 00:00:00',
    current_sec: 0
};

export const test_signin = {
    id: 'huh-1234',
    ts: '2020-01-01 00:00:00'
};
