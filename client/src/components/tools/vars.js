// https://ia801404.us.archive.org/6/items/maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3
const testAudio_testing = "../tools/wearenotokay.mp3";

const { REACT_APP_FULL_TITLE } = process.env;

const indexPath = "/";

const adminPath = "/admin";
const adminIndvlViewinglePath = "/admin/retrieve-info/media/media_id";
const adminIndvlNote = "/admin/retrieve-info/notes/:note_id";
const uploadMediaPath = "/admin/add-media";
const adminSendPW = "/admin/send-pw";
const adminShowAllUsers = "/admin/users";
const adminShowSingleUser = "/admin/retrieve-info/user";
const adminShowAllNotes = "/admin/retrieve-info/notes";

const userPath = "/review";
const userSingleMediaPath = "/review/:media_id";

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
    indexPath,
    adminPath,
    adminIndvlViewinglePath,
    adminIndvlNote,
    uploadMediaPath,
    adminSendPW,
    adminShowAllUsers,
    adminShowSingleUser,
    adminShowAllNotes,
    userPath,
    userSingleMediaPath,
    mediaId,
    testAudio_testing,
    noteInfo
};