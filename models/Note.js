import Sequelize, { DataTypes, Model } from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

/**
 * @class Note
 * 
 * @classdesc The Note model is for information such as a note's contents.
 * 
 * @description A note can be from any profile and can be an original note or a reply to another note.
 * 
 * Instantiate -> Note.build()
 * Create -> Note.create(). Have to add the note id to an profile's notesIds array and a media work's notesIds array.
 * Get all -> Note.findAll(). Have to find their related media works and authors.
 * Get one -> Note.findOne(). Have to find its related media work and author.
 * Update -> Note.update({}, {}) and note.save()
 * Delete -> note.destroy(). Have to find its related media work and author, and delete the note id from their notesIds arrays. TODO: Maybe have each have a field of former notes ids?
 * Get all replies to a note -> note.getAllRepliesPerNote()
 * Get the media work that a note is related to -> note.getMediaWorkOfNote()
 * Get the profile that created a note -> note.getNoteProfile()
 * "Delete" a note id in media and profile -> note.deleteNoteIdInProfileMedia()
 * Add this note id to an profile's notes ids -> note.addNoteIdToProfileNotesIds()
 * Add this note id to a media work's notesIds -> note.addNoteIdToMediaWorkNotesIds
 * Add this note's id, if it is a reply, to a note's notes ids -> note.addReplyNoteIdToNotesIds

note -> profile one to one
note -> media one to one
note -> note one to one (reply to note)
* 
* @extends {Model}
* 
* @property {number} id - The note's id.
* @property {string} profileId - The profile of the author.
* @property {string} noteContent - The note's content.
* @property {number} mediaId - The note's media work it's related to.
* @property {Date} noteCreatedTS - The note's created timestamp.
* @property {Date} [noteUpdatedTS] - The recently-updated note's ts.
* @property {Date} [noteDeletedTS] - When the note was (soft) "deleted".
* @property {number} [replyToNoteID] - The note's note from an profile.
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
     * Get the profile that created a note.
     */
    async getNoteProfile() {
        const note = this;
        const profile = await sequelize.models.Profile.findOne({
            where: {
                id: note.profileId
            }
        });
        return profile;
    };
    
    async deleteNoteIdInProfileMedia() {
        const note = this;
        const profile = await note.getNoteProfile();
        const mediaWork = await note.getMediaWorkOfNote();
        const profileNotesIds = profile.notesIds;
        const mediaWorkNotesIds = mediaWork.notesIds;
        const profileNotesIdsIndex = profileNotesIds.indexOf(note.id);
        const mediaWorkNotesIdsIndex = mediaWorkNotesIds.indexOf(note.id);
        if (profileNotesIdsIndex > -1) {
            profileNotesIds.splice(profileNotesIdsIndex, 1);
        }
        if (mediaWorkNotesIdsIndex > -1) {
            mediaWorkNotesIds.splice(mediaWorkNotesIdsIndex, 1);
        }
        await profile.save();
        await mediaWork.save();
    };

    async addNoteIdToProfileNotesIds() {
        const note = this;
        const profile = await note.getNoteProfile();
        const profileNotesIds = profile.notesIds;
        profileNotesIds.push(note.id);
        await profile.save();
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
    profileId: {
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
    Note.belongsTo(models.Profile);
    Note.belongsTo(models.Media);
};

export { Note };
