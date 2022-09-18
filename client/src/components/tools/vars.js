// https://ia801404.us.archive.org/6/items/maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore (mp3 and ogg)

const { REACT_APP_FULL_TITLE } = process.env;

const indexPath = "/";

const adminPath = "/admin"; // Temporary, for testing
const adminUploadPath = "/upload";
const adminSendDashPW = "/send-pw";
const adminInfoMediaPath = "/info/media";
const adminInfoNotesPath = "/info/notes";
const adminInfoUsersPath = "/info/users";

const reviewerPath = "/review";

const mediaId = 1;
const reviewerId = 1;
const noteId = 1;

const noteInfo = (noteId, userId, mediaId, noteBody, noteTimestamp, createdAt, updatedAt) => {
    this.noteId = noteId ? noteId : null;
    this.userId = userId;
    this.mediaId = mediaId;
    this.noteBody = noteBody;
    this.noteTimestamp = noteTimestamp;
    this.createdAt = createdAt;
    this.updatedAt = createdAt < updatedAt ? updatedAt : "not updated";

    this.getCreatedDate = () => {
        return new Date((this.createdAt).replace(' ', 'T'));
    };

    this.getUpdatedDate = () => {
        return new Date((this.updatedAt).replace(' ', 'T'));
    };

    this.getAllInfo = () => {
        return `Note Id: ${this.noteId} \n User Id: ${this.userId} \nMedia Id: ${this.mediaId} \nNote Body: ${this.noteBody} \nTimestamp: noteTimestamp \nCreated On: ${this.createdAt} \nand Updated On: ${this.updatedAt}`;
    };
};

export default REACT_APP_FULL_TITLE;

export {
    adminInfoMediaPath,
    adminInfoNotesPath,
    adminInfoUsersPath,
    adminPath, // Temporary, for testing
    adminSendDashPW,
    adminUploadPath,
    indexPath,
    mediaId,
    noteId,
    noteInfo,
    reviewerId,
    reviewerPath
};