'use server';
import axios from 'axios';

import { logDetails } from '@/app/lib/logger';

/**
 * Helper function to make API requests to Strapi.
 * @param {string} endpoint - The Strapi API endpoint.
 * @param {Object} [options] - Additional options for the request (e.g., method, headers, body).
 * 
 * @returns {Promise<Object>} - The response data from Strapi.
 */
const fetchFromStrapi = async (endpoint, options = {}) => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      ...options,
    });

    return response.data;
  } catch (error) {
    logDetails("Error fetching from Strapi", "Failed to fetch from Strapi", { error });

    console.error(`Error fetching from Strapi: ${error.message}`);

    throw new Error(error.response?.data?.error?.message || 'Failed to fetch from Strapi');
  }
};

/**
 * Selects all media records from Strapi.
 * @returns {Promise<Array>} - List of media records.
 */
export const selectAllMedia = async () => {
  const response = await fetchFromStrapi('/media');

  return response.data;
};

/**
 * Inserts a new media record into Strapi.
 * @param {Object} data - Media data to insert.
 * @returns {Promise<Object>} - The created media record.
 */
export const insertMedia = async (data) => {
  return fetchFromStrapi('/media', {
    method: 'POST',
    data: {
      data: {
        media_desc: data.mediaDesc,
        file_name: data.fileName,
        media_type: data.mediaType,
        media_title: data.mediaTitle,
        last_retrieved: data.lastRetrieved,
        thumb_url: data.thumbUrl,
        file_directory: data.fileDirectory,
      },
    },
  });
};

/**
 * Updates a user record in Strapi.
 * @param {Object} userInfo - User data to update.
 * @returns {Promise<Object>} - The updated user record.
 */
export const updateUser = async (userInfo) => {
  return fetchFromStrapi(`/users/${userInfo.userId}`, {
    method: 'PUT',
    data: {
      email: userInfo.email,
      created_at: userInfo.createdAt,
      media_list: userInfo.mediaList,
      last_sign_in_ts: userInfo.lastSignInTs,
      role: userInfo.role,
      hashed_password: userInfo.hashedPassword,
    },
  });
};

/**
 * Updates a media record in Strapi.
 * @param {Object} mediaInfo - Media data to update.
 * @returns {Promise<Object>} - The updated media record.
 */
export const updateMedia = async (mediaInfo) => {
  return fetchFromStrapi(`/media/${mediaInfo.mediaId}`, {
    method: 'PUT',
    data: {
      media_desc: mediaInfo.mediaDesc,
      file_name: mediaInfo.fileName,
      media_type: mediaInfo.mediaType,
      media_title: mediaInfo.mediaTitle,
      thumb_url: mediaInfo.thumbUrl,
      file_directory: mediaInfo.fileDirectory,
      last_retrieved: mediaInfo.lastRetrieved,
    },
  });
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
    logDetails("Error sending sign-in info", "Failed to send sign-in info", { error });

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
    const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/contact`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    logDetails("Error sending contact info", "Failed to send contact info", { error });

    throw new Error(`Failed to send contact info: ${error.message}`);
  }
};

/**
 * Selects all user records from Strapi.
 * @returns {Promise<Array>} - List of user records.
 */
export const selectAllUsers = async () => {
  const response = await fetchFromStrapi('/users');
  return response.data;
};

/**
 * Selects a single user by email from Strapi.
 * @param {string} email - User email.
 * @returns {Promise<Object>} - The user record.
 */
export const selectUserByEmail = async (email) => {
  const response = await fetchFromStrapi(`/users?filters[email][$eq]=${email}`);
  return response.data[0]; // Assuming the first result is the desired user
};

/**
 * Selects a single media record by ID from Strapi.
 * @param {number} mediaId - Media ID.
 * @returns {Promise<Object>} - The media record.
 */
export const selectMediaById = async (mediaId) => {
  const response = await fetchFromStrapi(`/media/${mediaId}`);
  return response.data;
};

/**
 * Selects recent sign-ins for a user from Strapi.
 * @param {number} userId - User ID.
 * @returns {Promise<Array>} - List of recent sign-ins.
 */
export const selectRecentSignInsForUser = async (userId) => {
  const response = await fetchFromStrapi(`/signins?filters[user_id][$eq]=${userId}&sort=created_at:desc&pagination[limit]=5`);
  return response.data;
};

export {
  insertMedia,
  updateUser,
  updateMedia,
  sendSignInInfo,
  sendContactInfo,
  selectAllMedia,
  selectAllUsers,
  selectUserByEmail,
  selectMediaById,
  selectRecentSignInsForUser
};
