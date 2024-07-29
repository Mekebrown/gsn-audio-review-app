import Image from "next/image";

/**
 * General Info on route navigation
 *
 * Features
 * Media, notes, user accounts, sign in form, contact form, 
 * notifications, settings, upload media, create notes, send a 
 * user a username/password
 *
 * Access levels
 * Full - Admins only; Access everything, handle media, grant user email access, handle password generation
 * Review - Clients only; Can view all user features, can handle notes
 * View - Visitors only; Can view all public pages
 */

// Entity Types
export const userTypes = ["admin", "client", "visitor"];
export const userAccess = ["full", "review", "view"];
export const mediaContentTypes = ["audio", "video", "image"];

// Images
export const tempImage = "/media/imgs/temp.jpg";
export const logoImage = "/media/imgs/logo192.png";
export const GSNLogo = ({
	customAlt = "GSN Logo",
	customWidth = 45,
	customHeight = 45,
}) => {
	return (
		<Image
			src={logoImage}
			alt={customAlt}
			width={customWidth}
			height={customHeight}
		/>
	);
};

// ENV URLs
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Auth URL
export const authURL = apiURL + "/auth/local";
export const bearerToken = `Bearer ` + process.env.API_TOKEN;

// Public frontend paths
const indexPath = baseURL;
const aboutGSNPath = baseURL + "/about/gsn";
const aboutGMPPath = baseURL + "/about/gmp";
const blogPath = baseURL + "/blog";
const contactPath = baseURL + "/contact";
const disclaimerPath = baseURL + "/about/ntks/disclaimer";
const faqPath = baseURL + "/about/ntks/faq";
const pricingPath = baseURL + "/about/ntks/pricing";
const privacyPath = baseURL + "/about/ntks/privacy";
const sitemapPath = baseURL + "/about/ntks/sitemap";
const termsPath = baseURL + "/about/ntks/terms";
const signinPath = baseURL + "/signin";

// Protected frontent paths. If visitor, NEED REDIRECT TO HOME PAGE
const allMediaPath = baseURL + "/media";
const singleMediaPath = baseURL + "/media"; // + media_id - A client can only access their assigned media
const allNotesPath = baseURL + "/notes";
const singleNotePath = baseURL + "/notes/"; // + note_id
const allUsersPath = baseURL + "/account/all"; // Admin-only; IF an admin. An admin can retrieve any single user's info with
const currentUserPath = baseURL + "/account"; // Will retrieve curent user's info  

// Media APIs
const getAllMediaAPIPath = apiURL + "/media?request_type=all";
const getSingleMediaAPIPath = apiURL + "/media?request_type=single&media_id=";
const setMediaAPIPath = apiURL + "/media"; // POST, PUT, DELETE (hide) requests; Admin-only

// Notes APIs
const getAllNotesAPIPath = apiURL + "/notes?request_type=all";
const getSingleNoteAPIPath = apiURL + "/notes?request_type=single&note_id=";
const setNoteAPIPath = apiURL + "/notes"; // POST, PUT, DELETE (hide) requests

// Users APIs
const getAllUsersAPIPath = apiURL + "/account?request_type=all"; // Admin-only
const getSingleUserAPIPath = apiURL + "/account?request_type=single&user_id="; // If admin, can retrieve any single user's info
const setUserAPIPath = apiURL + "/account"; // POST, PUT, DELETE (hide) requests; Admin-only

// Sign Ins/Outs APIs
const getLastUserSigninAPIPath = apiURL + "/signin?request_type=recent&user_id="; // Admin-only
const getAllSingleUserSigninsAPIPath = apiURL + "/signin?request_type=single&user_id="; // Admin-only
const getAllUsersSigninsAPIPath = apiURL + "/signin?request_type=all&user_id="; // Admin-only
const setSigninAPIPath = apiURL + "/signin"; // POST
const setSignoutAPIPath = apiURL + "/signout?user_id=";

// Random APIs
const searchAPIPath = apiURL + "/info/search?search_query=";
const settingsAPIPath = apiURL + "/info/settings";
const notifsAPIPath = apiURL + "/info/notifs?user_id=";
const contactAPIPath = apiURL + "/contact"; // POST
const uploadAPIPath = apiURL + "/media/new"; // POST

// Cookies
const gsnVisitedSiteCookie = "gsn-visited-site";
const gsnDisclaimerChoice = "gsn-disclaimer-choice";
const gsnSignInCookie = "gsn-sign-in-cookie";

export {
	indexPath,
	aboutGSNPath,
	aboutGMPPath,
	blogPath,
	contactPath,
	disclaimerPath,
	faqPath,
	pricingPath,
	privacyPath,
	sitemapPath,
	termsPath,
	signinPath,
	allMediaPath,
	singleMediaPath,
	allNotesPath,
	singleNotePath,
	allUsersPath,
	currentUserPath,
	contactAPIPath,
	getAllMediaAPIPath,
	getSingleMediaAPIPath,
	setMediaAPIPath,
	getAllNotesAPIPath,
	getSingleNoteAPIPath,
	setNoteAPIPath,
	getAllUsersAPIPath,
	getSingleUserAPIPath,
	setUserAPIPath,
	getLastUserSigninAPIPath,
	getAllSingleUserSigninsAPIPath,
	getAllUsersSigninsAPIPath,
	setSigninAPIPath,
	setSignoutAPIPath,
	searchAPIPath,
	settingsAPIPath,
	notifsAPIPath,
	uploadAPIPath,
	gsnVisitedSiteCookie,
	gsnDisclaimerChoice,
	gsnSignInCookie
}