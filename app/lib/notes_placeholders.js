import StrapiHandler from "@/app/lib/strapiclient_handler";

// id, body, media (id, url), createdAt, updatedAt, users_permissions_user 
// (id, username), timestamp 
export const allNotes = async () => {
	const notesCollection = StrapiHandler.collection('notes');

	return (await notesCollection.find({ populate: ["users_permissions_user", "media"] }));
};

export const allNotesForMedia = async ({ mediaId }) => {
	const notesCollection = StrapiHandler.collection('notes');

	const filteredMediaNotes = await notesCollection.find({ populate: ["users_permissions_user", "media"] }, { filters: { mediaId: { $eq: mediaId } } });

	return filteredMediaNotes;
};

export const noteById = async (documentId) => {
	const notesCollection = StrapiHandler.collection('notes');

	return (await notesCollection.findOne(documentId, { populate: ["users_permissions_user", "media"] }));
};

// The default export is notesExample

/**
 * A note will have:
 * 
 * @param {number} noteId 
 * @param {number} userId 
 * @param {string} body 
 * @param {number} mediaId 
 * @param {string} createdAt 
 * @param {string} updatedAt 
 * @param {string} timestamp 
 */
const noteInfo = (
	noteId,
	userId,
	body,
	mediaId,
	createdAt,
	updatedAt,
	timestamp,
) => {
	this.noteId = parseInt(noteId) !== undefined ? parseInt(noteId) : null;
	this.userId = parseInt(userId) !== undefined ? parseInt(userId) : null;
	this.body = body;
	this.mediaId = parseInt(mediaId) !== undefined ? parseInt(mediaId) : null;
	this.createdAt = createdAt;
	this.updatedAt = createdAt < updatedAt ? updatedAt : "not updated";
	this.timestamp = timestamp;

	this.getCreatedDate = () => {
		return new Date(this.createdAt.replace(" ", "T"));
	};

	this.getUpdatedDate = () => {
		return new Date(this.updatedAt.replace(" ", "T"));
	};

	this.getAllInfo = () => {
		return `Note Id: ${this.noteId} \n User Id: ${this.userId} \nMedia Id: ${this.mediaId} \nNote Body: ${this.body} \nTimestamp: timestamp \nCreated On: ${this.createdAt} \nand Updated On: ${this.updatedAt}`;
	};
};

const notesExample = [
	{
		noteId: 1,
		userId: 1,
		body: "This is a great job Lance",
		mediaId: 1,
		createdAt: "2004-10-19 10:23:54",
		updatedAt: "2004-10-19 10:23:54",
		timestamp: "17/12/1997 15:37:16.00",
	},
	{
		noteId: 2,
		userId: 2,
		body: "This is a great track job",
		mediaId: 1,
		createdAt: "2004-10-19 10:23:54",
		updatedAt: "2004-10-19 10:23:54",
		timestamp: "2004-10-19 10:23:54",
	},
];

export default notesExample;
export { noteInfo };
