/**
 * General Info on route navigation in the browser
 * 
 * Features
 * Media, notes, user accounts, sign in, contact, notifs
 * 
 * Access levels
 * Full - Admins only; Access everything, handle media, grant user email access, handle password generation
 * Review - Users only; Can view all user features, can handle notes
 * View - Users only; Can view all user features
 */
export const userTypes = ["admin", "user", "visitor"];

export const userAccess = ["full", "review", "view"];

export const mediaTypes = ["audio", "video", "image"];

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// General paths
const indexPath = baseURL + "/";
const aboutGSNPath = baseURL + "/about/gsn";
const aboutGMPPath = baseURL + "/about/gmp";
const blogPath = baseURL + "/blog";
const contactPath = baseURL + "/contact";
const contactAPIPath = apiURL + "/contact"; // POST
const disclaimerPath = baseURL + "/about/ntks/disclaimer"; // Visitor/user's choice will be saved in a utility cookie
const faqPath = baseURL + "/about/ntks/faq";
const pricingPath = baseURL + "/about/ntks/pricing";
const privacyPath = baseURL + "/about/ntks/privacy";
const sitemapPath = baseURL + "/about/ntks/sitemap";
const termsPath = baseURL + "/about/ntks/terms";
const signinPath = baseURL + "/signin";

// Protected paths
const allMediaPath = baseURL + "/media";
const getAllMediaAPIPath = apiURL + "/media?request_type=all";
const getSingleMediaAPIPath = apiURL + "/media?request_type=single&media_id=";
const setMediaAPIPath = apiURL + "/media"; // POST, PUT, DELETE (hide) requests; Admin-only

const allNotesPath = baseURL + "/notes";
const singleNotePath = baseURL + "/notes/";
const getAllNotesAPIPath = apiURL + "/notes?request_type=all";
const getSingleNoteAPIPath =
	apiURL + "/notes?request_type=single&note_id=";
const setNoteAPIPath = apiURL + "/notes"; // POST, PUT, DELETE (hide) requests

const allUsersPath = baseURL + "/account/all"; // Admin-only
const currentUserPath = baseURL + "/account/"; // If admin, can retrieve any single user's info
const getAllUsersAPIPath = apiURL + "/account?request_type=all"; // Admin-only
const getSingleUserAPIPath =
	apiURL + "/account?request_type=single&user_id="; // If admin, can retrieve any single user's info
const setUserAPIPath = apiURL + "/account"; // POST, PUT, DELETE (hide) requests; Admin-only

const getLastUserSigninAPIPath =
	apiURL + "/signin?request_type=recent&user_id="; // Admin-only
const getAllSingleUserSigninsAPIPath =
	apiURL + "/signin?request_type=single&user_id="; // Admin-only
const getAllUsersSigninsAPIPath = apiURL + "/signin?request_type=all&user_id="; // Admin-only
const setSigninAPIPath = apiURL + "/signin"; // POST
const setSignoutAPIPath = apiURL + "/signout?user_id=";

const searchAPIPath = apiURL + "/info/search?search_query=";
const settingsAPIPath = apiURL + "/info/settings";
const notifsAPIPath = apiURL + "/info/notifs?user_id=";
