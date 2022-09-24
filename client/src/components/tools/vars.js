// https://ia801404.us.archive.org/6/items/maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore (mp3 and ogg)

const indexPath = "/";

const adminUploadPath = "/upload";
const adminSendDashPW = "/send-pw";
const allMediaPath = "/media";
const adminInfoNotesPath = "/notes";
const adminInfoUsersPath = "/users";
const loginPath = "/login";
const logoutPath = "/logout";
const contactPath = "/contact";

const adminId = 1;
const reviewerId = 2;
const mediaId = 4;
const noteId = 11;

const userIds = [1, 2];
const noteIds = [7, 8, 9, 10, 11, 13];
const mediaIds = [2, 3, 4, 5, 6];

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

export default adminInfoNotesPath; // Temporary, for testing

export {
    adminId,
    adminInfoNotesPath,
    adminInfoUsersPath,
    adminSendDashPW,
    adminUploadPath,
    allMediaPath,
    contactPath,
    indexPath,
    loginPath,
    logoutPath,
    mediaId,
    noteId,
    noteInfo,
    returnFileSize,
    reviewerId,
    validFileType,
    userIds,
    noteIds,
    mediaIds
};
