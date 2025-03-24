'use server';
import axios from "axios";
import sql from './db.js';

/**
 * Inserts a new media record into the database.
 * @param {Object} data - Media data to insert.
 * @returns {Promise<Object>} - Query result.
 */
export const insertMedia = async (data) => {
    const query = await sql`
    INSERT INTO media
      (media_desc, file_name, media_type, media_title, last_retrieved, thumb_url, file_directory, created_at)
    VALUES
      (${data.mediaDesc}, ${data.fileName}, ${data.mediaType}, ${data.mediaTitle}, ${data.lastRetrieved}, ${data.thumbUrl}, ${data.fileDirectory}, now())
    RETURNING id
  `;
    return query;
};

/**
 * Updates a user record in the database.
 * @param {Object} userInfo - User data to update.
 * @returns {Promise<Object>} - Query result.
 */
export const updateUser = async (userInfo) => {
    const query = await sql`
    UPDATE users
    SET
      email = ${userInfo.email},
      created_at = ${userInfo.createdAt},
      media_list = ${userInfo.mediaList},
      last_sign_in_ts = ${userInfo.lastSignInTs},
      role = ${userInfo.role},
      hashed_password = ${userInfo.hashedPassword}
    WHERE id = ${userInfo.userId}
    RETURNING id
  `;
    return query;
};

/**
 * Updates a media record in the database.
 * @param {Object} mediaInfo - Media data to update.
 * @returns {Promise<Object>} - Query result.
 */
export const updateMedia = async (mediaInfo) => {
    const query = await sql`
    UPDATE media
    SET
      media_desc = ${mediaInfo.mediaDesc},
      file_name = ${mediaInfo.fileName},
      media_type = ${mediaInfo.mediaType},
      media_title = ${mediaInfo.mediaTitle},
      thumb_url = ${mediaInfo.thumbUrl},
      file_directory = ${mediaInfo.fileDirectory},
      last_retrieved = ${mediaInfo.lastRetrieved}
    WHERE id = ${mediaInfo.mediaId}
    RETURNING id
  `;
    return query;
};

/**
 * Sends sign-in information to the authentication API.
 * @param {Object} signInInfo - Sign-in data.
 * @returns {Promise<Object>} - User profile and JWT.
 */
export const sendSignInInfo = async (signInInfo) => {
    try {
        const response = await axios.post(process.env.NEXTAUTH_URL, signInInfo, {
            headers: { "Content-Type": "application/json" },
        });
        const { data } = response;
        return { userProfile: data.user, userJWT: data.jwt };
    } catch (error) {
        throw new Error(`Failed to send sign-in info: ${error.message}`);
    }
};

/**
 * Sends contact information to the contact API.
 * @param {Object} formData - Contact form data.
 * @returns {Promise<Object>} - API response data.
 */
export const sendContactInfo = async (formData) => {
    try {
        const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/contact`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to send contact info: ${error.message}`);
    }
};

/**
 * Selects all media records from the database.
 * @returns {Promise<Array>} - List of media records.
 */
export const selectAllMedia = async () => {
    const query = await sql`
    SELECT id, media_title, media_desc, file_name, thumb_url, file_directory
    FROM media
  `;
    return query;
};

/**
 * Selects all user records from the database.
 * @returns {Promise<Array>} - List of user records.
 */
export const selectAllUsers = async () => {
    const query = await sql`
    SELECT id, email, created_at, role
    FROM users
  `;
    return query;
};

/**
 * Selects a single user by email.
 * @param {string} email - User email.
 * @returns {Promise<Object>} - User record.
 */
export const selectUserByEmail = async (email) => {
    const query = await sql`
    SELECT id, email, created_at, role
    FROM users
    WHERE email = ${email}
  `;
    return query;
};

/**
 * Selects a single media record by ID.
 * @param {number} mediaId - Media ID.
 * @returns {Promise<Object>} - Media record.
 */
export const selectMediaById = async (mediaId) => {
    const query = await sql`
    SELECT id, media_title, media_desc, file_name, thumb_url, file_directory
    FROM media
    WHERE id = ${mediaId}
  `;
    return query;
};

/**
 * Selects recent sign-ins for a user.
 * @param {number} userId - User ID.
 * @returns {Promise<Array>} - List of recent sign-ins.
 */
export const selectRecentSignInsForUser = async (userId) => {
    const query = await sql`
    SELECT *
    FROM signins
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 5
  `;
    return query;
};
