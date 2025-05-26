import Image from "next/image";

/**
 * General Info on route navigation
 *
 * Features
 * Media, notes, member accounts, sign in form, contact form, 
 * notifications, settings, upload media, create notes, send a 
 * member a membername/password
 *
 * Access levels
 * Full - Admins only; Access everything, handle media, grant member email access, handle password generation
 * Review - Clients only; Can view all member features, can handle notes
 * View - Visitors only; Can view all public pages
 */

// Entity Types
export const memberTypes = ["admin", "client", "visitor"];
export const memberAccess = ["full", "review", "view"];
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
			src={ logoImage }
			alt={ customAlt }
			width={ customWidth }
			height={ customHeight }
		/>
	);
};

// ENV URLs
export const baseURL = JSON.parse(JSON.stringify(new URL(process.env.NEXT_PUBLIC_BASE_URL)));
export const apiURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

// Auth URL
export const bearerToken = `Bearer ` + process.env.API_TOKEN;

// Public frontend paths
const indexPath = baseURL;
const aboutGSNPath = baseURL + "/about/gsn";
const aboutGMPPath = baseURL + "/about/gmp";
const blogPath = baseURL + "/blog";
const contactPath = baseURL + "/contact";
const disclaimerPath = baseURL + "/ntks/disclaimer";
const faqPath = baseURL + "/ntks/faq";
const pricingPath = baseURL + "/ntks/pricing";
const privacyPath = baseURL + "/ntks/privacy";
const sitemapPath = baseURL + "/ntks/sitemap";
const termsPath = baseURL + "/ntks/terms";
const signinPath = baseURL + "/signin";

// Protected frontent paths. If visitor, NEED REDIRECT TO HOME PAGE
const allMediaPath = baseURL + "/media";
const singleMediaPath = baseURL + "/media"; // + media_id - A client can only access their assigned media
const allNotesPath = baseURL + "/notes";
const singleNotePath = baseURL + "/notes/"; // + note_id
const allMembersPath = baseURL + "/account/all"; // Admin-only; IF an admin. An admin can retrieve any single member's info with
const currentMemberPath = baseURL + "/account"; // Will retrieve curent member's info  

// Media APIs
const getAllMediaAPIPath = apiURL + "/medias";
const getSingleMediaAPIPath = apiURL + "/medias/"; // + media_id
const setMediaAPIPath = apiURL + "/medias"; // POST, PUT, DELETE (hide) requests; Admin-only

// Notes APIs
const getAllNotesAPIPath = apiURL + "/notes";
const getSingleNoteAPIPath = apiURL + "/notes/"; // + note_id
const setNoteAPIPath = apiURL + "/notes"; // POST, PUT, DELETE (hide) requests

// Members APIs
const getAllMembersAPIPath = apiURL + "/members"; // Admin-only
const getSingleMemberAPIPath = apiURL + "/members/";  // + media_id If admin, can retrieve any single member's info
const setMemberAPIPath = apiURL + "/members"; //apiURL + "/members"; // POST, PUT, DELETE (hide) requests; Admin-only

// Sign Ins/Outs APIs
const getLastMemberSigninAPIPath = "???";  // + member_id Admin-only
const getAllSingleMemberSigninsAPIPath = "???"; // + member_id Admin-only
const getAllMembersSigninsAPIPath = "???"; // + member_id Admin-only
const setSigninAPIPath = apiURL + "???"; // POST
const setSignoutAPIPath = apiURL + "???"; // + member_id

// Random APIs
const searchAPIPath = apiURL + "/info/search?search_query=";
const settingsAPIPath = apiURL + "/info/settings";
const notifsAPIPath = apiURL + "/info/notifs?member_id="; // + member_id
const contactAPIPath = apiURL + "/contact"; // POST
const uploadAPIPath = apiURL + "/media/new"; // POST

// Cookies
const gsnVisitedSiteCookie = "gsn-visited-site";
const gsnDisclaimerChoice = "gsn-disclaimer-choice";
const gsnSignInCookie = "gsn-sign-in-cookie";
const signInUsernameCookie = "sign-in-username-cookie";
const userIdCookie = "gsn-user-id-cookie";

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
	allMembersPath,
	currentMemberPath,
	contactAPIPath,
	getAllMediaAPIPath,
	getSingleMediaAPIPath,
	setMediaAPIPath,
	getAllNotesAPIPath,
	getSingleNoteAPIPath,
	setNoteAPIPath,
	getAllMembersAPIPath,
	getSingleMemberAPIPath,
	setMemberAPIPath,
	getLastMemberSigninAPIPath,
	getAllSingleMemberSigninsAPIPath,
	getAllMembersSigninsAPIPath,
	setSigninAPIPath,
	setSignoutAPIPath,
	searchAPIPath,
	settingsAPIPath,
	notifsAPIPath,
	uploadAPIPath,
	gsnVisitedSiteCookie,
	gsnDisclaimerChoice,
	gsnSignInCookie,
	signInUsernameCookie,
	userIdCookie
}