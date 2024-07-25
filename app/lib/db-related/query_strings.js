'use server';

import sql from './db.js';

export const insert_media = async (data) => {
	const insert_media_query = await sql`
        INSERT INTO media
            (media_desc, file_name, media_type,
            project_name, last_retrieved,
            file_directory, created_at) 
        VALUES
            ($1, $2, $3, $4, $5, $6, $7)
    `;

	return insert_media_query;
};

export const insert_note = async (data) => {
	const insert_note_query = await sql`
        INSERT INTO notes 
            (user_id, media_id, note_body, note_timestamp,
            last_retrieved, created_at, updated_at)
        VALUES 
            ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `;

	return insert_note_query;
};

export const insert_user = async (data) => {
	const insert_user_query = await sql`
        INSERT INTO users
            (role, email, hashed_password,
            media_list, created_at) 
        VALUES
            ($1, $2, $3, $4, now()) 
        RETURNING id
    `;

	return insert_user_query;
};

export const select_all_media = async () => {
	const select_all_media_query = await sql`
        SELECT
            id, project_name, media_desc, 
            file_name, project_thumb, file_directory
        FROM 
            media
    `;

	return select_all_media_query;
};

export const select_all_notes = async () => {
	const select_all_notes_query = await sql`
        SELECT
            *
        FROM 
            notes
    `;

	return select_all_notes_query;
};

export const select_all_users = async () => {
	const select_all_users_query = await sql`
        SELECT
            *
        FROM 
            users
    `;

	return select_all_users_query;
};

export const select_a_note = async (note_id) => {
	const select_one_note_query = await sql`
        SELECT
            id, note_body, note_timestamp
        FROM
            notes 
        WHERE media_id = $1
        ORDER BY created_at 
        DESC LIMIT 5
    `;

	return select_one_note_query;
};

export const select_a_user = async (user_id) => {
	const select_one_user_query = await sql`
        SELECT 
            * 
        FROM 
            users
        WHERE 
            email = $1
    `;

	return select_one_user_query;
};

export const select_recent_signins_for_user = async (user_id) => {
	const select_recent_signins_for_user_query = await sql`
        SELECT 
            * 
        FROM 
            signins
        WHERE 
            user_id = $1
        LIMIT 5
    `;

	return select_recent_signins_for_user_query;
};

export const select_user_signin = async (userEmail, userPassword) => {
	return true;
};

export const select_a_track = async (media_id) => {
	const select_one_track_query = await sql`
        SELECT 
            * 
        FROM 
            media
        WHERE 
            id = $1
    `;

	return select_one_track_query;
};

export const update_note = async (note_info) => {
	const update_note_query = await sql`
        UPDATE notes
        SET
            note_body = $1,
            note_timestamp = $2,
            last_retrieved = $3,
            updated_at = $4
        WHERE id = $5
        AND media_id = $6
    `;

	return update_note_query;
};

export const update_user = async (user_info) => {
	const update_users_query = await sql`
        UPDATE users 
        SET 
            (user_email = $1
            user_created_ts = $2
            user_media_list = $3
            last_sign_in_ts = $4
            user_role = $5
            user_hashed_pw = $6)
        WHERE user_id = $7
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

	return update_user_query;
};

export const update_track = async (user_info) => {
	const update_track_query = await sql`
        UPDATE media 
        SET 
            (user_email = $1
            user_created_ts = $2
            user_media_list = $3
            last_sign_in_ts = $4
            user_role = $5
            user_hashed_pw = $6)
        WHERE user_id = $7
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

	return update_track_query;
};

export const send_signin_info = async (formData) => {
	const response = await fetch(process.env.NEXTAUTH_URL + "/api/signin", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	} else {
		return JSON.stringify(response);
	}
};

export const send_contact_info = async (formData) => {
	for (let ind of formData) {
		if (ind in ["name", "email", "subject"]) {
			formData.append(ind, ind.value);
		} else if (ind === "subjectDropdown") {
			formData.append("subject_cat", ind.subjectDropdown);
		} else if (ind === "contactMsg") {
			formData.append("message", ind.contactMsg);
		}
	}

	// Send the info and retrieve response
	const response = await fetch(process.env.NEXTAUTH_URL + "/api/contact", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	} else {
		return JSON.stringify(response);
	}
};

export const send_admin_email = () => {};

export const get_all_media = async () => {
	const data = await select_all_media();
	const res = response.json();

	// return new Array(res);
	return [
		{
			id: 1,
			thumbURL: "thumbURL",
		},
		{
			id: 2,
			thumbURL: " Twh thumbURL",
		},
	];
};


// const add_signins_for_admin = "LEFT JOIN user_signins ON users.user_id = user_signins.sign_in_user_id";
export const add_signins_for_admin = async () => {
    const signins_for_admin = await sql`
      LEFT JOIN 
        user_signins 
      ON 
        users.user_id = user_signins.sign_in_user_id
    `;
  
    return signins_for_admin;
};

// const fields_to_review = ` 
//     users.user_id,
//     users.user_email,
//     users.user_created_ts,
//     users.user_media_list,
//     users.last_sign_in_ts,
//     users.last_sign_out_ts,
//     users.user_internal_note,
//     users.user_discl_agreed_ts,
//     users.is_discl_agreed,
//     users.user_role,
//     users.user_hashed_pw,
//     users_projects.project_id,
//     users_projects.project_name,
//     users_projects.project_description,
//     users_projects.project_media_list,
//     users_projects.project_note_list,
//     users_projects.project_timer_list,
//     users_projects.project_user_list,
//     users_projects.project_created_ts,
//     users_projects.project_updated_ts,
//     users_projects.project_updated_type,
//     users_projects.project_settings,
//     users_projects.project_is_deleted,
//     users_projects.project_deleted_ts,
//     users_media.media_id,
//     users_media.media_name,
//     users_media.media_description,
//     users_media.media_type,
//     users_media.media_url,
//     users_media.media_note_list,
//     users_media.media_created_ts,
//     users_media.media_updated_ts,
//     users_media.media_updated_type,
//     users_media.media_settings,
//     users_media.media_is_deleted,
//     users_media.media_deleted_ts,
//     users_notes.note_id,
//     users_notes.note_content,
//     users_notes.note_created_ts,
//     users_notes.note_updated_ts,
//     users_notes.note_updated_type,
//     users_notes.note_settings,
//     users_notes.note_is_deleted,
//     users_notes.note_deleted_ts,
//     users_notes.note_reply_list,
//     users_notes.note_media_list,
//     users_notes.note_user_list,
//     users_signins.sign_in_id,
//     users_signins.sign_in_ts,
//     users_signins.sign_in_ip,
//     users_signins.sign_in_user_agent,
//     users_signins.sign_in_is_successful,
//     users_signins.sign_in_user_id,
//     users_signins.sign_in_user_role
// `;
