// https://ia801404.us.archive.org/6/items/maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3
const testAudio_testing = "../tools/wearenotokay.mp3";

const { REACT_APP_FULL_TITLE } = process.env;

const adminPath = "/admin";
const userPath = "/review";
const userSingleMediaPath = "/review/:media_id";
const adminIndvlViewinglePath = "/admin/retrieve-info/media/media_id";
const adminIndvlNote = "/admin/review-info/note/:note_id";
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
    userSingleMediaPath,
    allNotesPath,
    allProjectsPath,
    allUsersPath,
    indexPath,
    indvlProjectPath,
    indvlUserPath,
    userPath,
    uploadMediaPath,
    mediaId,
    adminIndvlNote,
    testAudio_testing,
    noteInfo
};