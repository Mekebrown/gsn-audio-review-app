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

const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon"
];

const validFileType = (file) => {
    return fileTypes.includes(file.type);
};

const returnFileSize = (number) => {
    if (number < 1024) {
        return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
    }
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
    returnFileSize,
    reviewerId,
    reviewerPath,
    validFileType
};
