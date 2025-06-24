import StrapiHandler from "@/app/lib/strapiclient_handler";

// id, title, body, media (id, title, url), createdAt, updatedAt, users_permissions_user (id, username), cover (id, url, alternativeText, caption), timestamp 
export const allNotes = async () => {
	const notesCollection = StrapiHandler.collection('notes');

	return (await notesCollection.find({ populate: ["cover", "users_permissions_user", "media"] }));
};

export const noteById = async (documentId) => {
	const notesCollection = StrapiHandler.collection('notes');

	return (await notesCollection.findOne(documentId, { populate: ["cover", "users_permissions_user", "media"] }));
};

// The default export is notesExample

/**
 * A note will have:
 * 
 * @param {number} noteId 
 * @param {number} userId 
 * @param {string} noteBody 
 * @param {string} noteTitle 
 * @param {number} mediaId 
 * @param {string} createdAt 
 * @param {string} updatedAt 
 * @param {string} noteDatetime 
 */
const noteInfo = (
	noteId,
	userId,
	noteBody,
	noteTitle,
	mediaId,
	createdAt,
	updatedAt,
	noteDatetime,
) => {
	this.noteId = parseInt(noteId) !== undefined ? parseInt(noteId) : null;
	this.userId = parseInt(userId) !== undefined ? parseInt(userId) : null;
	this.noteBody = noteBody;
	this.noteTitle = noteTitle;
	this.mediaId = parseInt(mediaId) !== undefined ? parseInt(mediaId) : null;
	this.createdAt = createdAt;
	this.updatedAt = createdAt < updatedAt ? updatedAt : "not updated";
	this.noteDatetime = noteDatetime;

	this.getCreatedDate = () => {
		return new Date(this.createdAt.replace(" ", "T"));
	};

	this.getUpdatedDate = () => {
		return new Date(this.updatedAt.replace(" ", "T"));
	};

	this.getAllInfo = () => {
		return `Note Id: ${this.noteId} \n User Id: ${this.userId} \nMedia Id: ${this.mediaId} \nNote Body: ${this.noteBody} \nDatetime: noteDatetime \nCreated On: ${this.createdAt} \nand Updated On: ${this.updatedAt}`;
	};
};

const notesExample = [
	{
		noteId: 1,
		userId: 1,
		noteBody: "This is a great job Lance",
		noteTitle: "Title of a great job Lance",
		mediaId: 1,
		createdAt: "2004-10-19 10:23:54",
		updatedAt: "2004-10-19 10:23:54",
		noteDatetime: "17/12/1997 15:37:16.00",
	},
	{
		noteId: 2,
		userId: 2,
		noteBody: "This is a great track job",
		noteTitle: "Title of a great job Lance",
		mediaId: 1,
		createdAt: "2004-10-19 10:23:54",
		updatedAt: "2004-10-19 10:23:54",
		noteDatetime: "2004-10-19 10:23:54",
	},
];

export default notesExample;
export { noteInfo };