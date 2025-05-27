// The default export is notesExample

/**
 * A note will have:
 * 
 * @param {*} noteId 
 * @param {*} userId 
 * @param {*} mediaId 
 * @param {*} noteBody 
 * @param {*} noteTitle 
 * @param {*} noteDatetime 
 * @param {*} createdAt 
 * @param {*} updatedAt 
 */
export const noteInfo = (
	noteId,
	userId,
	mediaId,
	noteBody,
	noteTitle,
	noteDatetime,
	createdAt,
	updatedAt
) => {
	this.noteId = noteId ? noteId : null;
	this.userId = userId;
	this.mediaId = mediaId;
	this.noteBody = noteBody;
	this.noteTitle = noteTitle;
	this.noteDatetime = noteDatetime;
	this.createdAt = createdAt;
	this.updatedAt = createdAt < updatedAt ? updatedAt : "not updated";

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
		mediaId: 1,
		noteBody: "This is a great job Lance",
		noteTitle: "Title of a great job Lance",
		noteDatetime: "17/12/1997 15:37:16.00",
		createdAt: "2004-10-19 10:23:54",
		updatedAt: "2004-10-19 10:23:54",
	},
	{
		noteId: 2,
		userId: 2,
		mediaId: 1,
		noteBody: "This is a great track job",
		noteTitle: "Title of a great job Lance",
		noteDatetime: "2004-10-19 10:23:54",
		createdAt: "2004-10-19 10:23:54",
		updatedAt: "2004-10-19 10:23:54",
	},
];

export default notesExample;
