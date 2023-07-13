import Sequelize, { DataTypes, Model } from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

/**
 * @class Note
 * 
 * @classdesc The Note model is for information such as a note's contents.
 * 
 * @description A note can be from any user and can be an original note or a reply to another note.
 * 
 * Instantiate -> Note.build()
 * Create -> Note.create(). Have to add the note id to a user's notesIds array and a media work's notesIds array.
 * Get all -> Note.findAll(). Have to find their related media works and authors.
 * Get one -> Note.findOne(). Have to find its related media work and author.
 * Update -> Note.update({}, {}) and note.save()
 * Delete -> note.destroy(). Have to find its related media work and author, and delete the note id from their notesIds arrays. TODO: Maybe have each have a field of former notes ids?
 * Get all replies to a note -> note.getAllRepliesPerNote()
 * Get the media work that a note is related to -> note.getMediaWorkOfNote()
 * Get the user that wrote a note -> note.getNoteAuthor()
 * "Delete" a note id in media and user -> note.deleteNoteIdInUserMedia()
 * Add this note id to a user's notes ids -> note.addNoteIdToUserNotesIds()
 * Add this note id to a media work's notesIds -> note.addNoteIdToMediaWorkNotesIds
 * Add this note's id, if it is a reply, to a note's notes ids -> note.addReplyNoteIdToNotesIds

note -> user one to one
note -> media one to one
note -> note one to one (reply to note)
* 
* @extends {Model}
* 
* @property {number} id - The note's id.
* @property {string} userId - The author.
* @property {string} noteContent - The note's content.
* @property {number} mediaId - The note's media work it's related to.
* @property {Date} noteCreatedTS - The note's created timestamp.
* @property {Date} [noteUpdatedTS] - The recently-updated note's ts.
* @property {Date} [noteDeletedTS] - When the note was (soft) "deleted".
* @property {number} [replyToNoteID] - The note's note from a user.
*/
class Note extends Model {
    /**
     * Get all notes that are replies to a note.
     */
    async getAllRepliesPerNote () {
        const note = this;
        const replies = await sequelize.models.Note.findAll({
            where: {
                replyToNoteId: note.id
            }
        });
        return replies;
    };

    /**
     * Get the media work that a note is related to.
     */
    async getMediaWorkOfNote () {
        const note = this;
        const mediaWork = await sequelize.models.Media.findOne({
            where: {
                id: note.mediaId
            }
        });
        return mediaWork;
    }

    /**
     * Get the user that wrote a note.
     */
    async getNoteAuthor() {
        const note = this;
        const author = await sequelize.models.User.findOne({
            where: {
                id: note.userId
            }
        });
        return author;
    };
    
    async deleteNoteIdInUserMedia() {
        const note = this;
        const author = await note.getNoteAuthor();
        const mediaWork = await note.getMediaWorkOfNote();
        const authorNotesIds = author.notesIds;
        const mediaWorkNotesIds = mediaWork.notesIds;
        const authorNotesIdsIndex = authorNotesIds.indexOf(note.id);
        const mediaWorkNotesIdsIndex = mediaWorkNotesIds.indexOf(note.id);
        if (authorNotesIdsIndex > -1) {
            authorNotesIds.splice(authorNotesIdsIndex, 1);
        }
        if (mediaWorkNotesIdsIndex > -1) {
            mediaWorkNotesIds.splice(mediaWorkNotesIdsIndex, 1);
        }
        await author.save();
        await mediaWork.save();
    };

    async addNoteIdToUserNotesIds() {
        const note = this;
        const author = await note.getNoteAuthor();
        const authorNotesIds = author.notesIds;
        authorNotesIds.push(note.id);
        await author.save();
    };

    async addNoteIdToMediaWorkNotesIds() {
        const note = this;
        const mediaWork = await note.getMediaWorkOfNote();
        const mediaWorkNotesIds = mediaWork.notesIds;
        mediaWorkNotesIds.push(note.id);
        await mediaWork.save();
    };

    async addReplyNoteIdToNotesIds() {
        const note = this;
        const replyToNote = await sequelize.models.Note.findOne({
            where: {
                id: note.replyToNoteId
            }
        });
        const replyToNoteNotesIds = replyToNote.notesIds;
        replyToNoteNotesIds.push(note.id);
        await replyToNote.save();
    };
}

Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    noteContent: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mediaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    noteCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: Sequelize.NOW
    },
    noteUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    noteDeletedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    replyToNoteId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    sequelize,
    paranoid: true,
    modelName: 'Note',
    tableName: 'notes',
    timestamps: true,
    createdAt: 'noteCreatedTS',
    updatedAt: 'noteUpdatedTS',
    deletedAt: 'noteDeletedTS',
});

Note.associate = (models) => {
    Note.belongsTo(models.User);
    Note.belongsTo(models.Media);
};

export { Note };
