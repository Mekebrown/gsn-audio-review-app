const testAudio_testing = "../tools/wearenotokay.mp3";

const { REACT_APP_FULL_TITLE } = process.env;

const adminPath = "/review";
const singleMediaPath = "/usingle";
const adminIndvlViewinglePath = "/asingle";
const allNotesPath = "/notes";
const allProjectsPath = "/projects";
const allUsersPath = "/users";
const indexPath = "/";
const indvlProjectPath = "project_path";
const indvlUserPath = "/user_path";
const uploadMediaPath = "/review/add-media";
const mediaId = 1;

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
    adminPath,
    adminIndvlViewinglePath,
    allNotesPath,
    allProjectsPath,
    allUsersPath,
    indexPath,
    indvlProjectPath,
    indvlUserPath,
    singleMediaPath,
    uploadMediaPath,
    mediaId,
    testAudio_testing,
    noteInfo
};