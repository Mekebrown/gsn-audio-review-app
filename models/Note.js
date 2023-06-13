const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');

/**
 * @class Note
 * 
 * @classdesc The Note model is for information such as a note's contents.
 * 
 * @description A note can be from any user and can be an original note or a reply to another note.
 * 
 * Instantiate -> Note.build()
 * Create -> Note.create(). Have to add the note_id to a user's notes_ids array and a media work's notes_ids array.
 * Get all -> Note.findAll(). Have to find their related media works and authors.
 * Get one -> Note.findOne(). Have to find its related media work and author.
 * Update -> Note.update({}, {}) and note.save()
 * Delete -> note.destroy(). Have to find its related media work and author, and delete the note_id from their notes_ids arrays. TODO: Maybe have each have a field of former_notes_ids?
 * Get all replies to a note -> note.getAllRepliesPerNote()
 * Get the media work that a note is related to -> note.getMediaWorkOfNote()
 * Get the user that wrote a note -> note.getNoteAuthor()
 * "Delete" a note -> note.deleteNote()
 * Add this note id to a user's notes ids -> note.addNoteIdToUserNotesIds()
 * Add this note id to a media work's notes_ids -> note.addNoteIdToMediaWorkNotesIds
 * Add this note's id, if it is a reply, to a note's notes_ids -> note.addReplyNoteIdToNotesIds

    note -> user one to one
    note -> media one to one
    note -> note one to one (reply to note)
 * 
 * @extends {Model}
 * 
 * @property {number} note_id - The note's id.
 * @property {string} user_id - The author.
 * @property {string} note_content - The note's content.
 * @property {number} media_id - The note's media work it's related to.
 * @property {Date} note_created_ts - The note's created timestamp.
 * @property {Date} [note_updated_ts] - The recently-updated note's ts.
 * @property {Date} [note_deleted_ts] - When the note was (soft) "deleted".
 * @property {number} [reply_to_note_id] - The note's note from a user.
 */
class Note extends Model {
    /**
     * Get all notes that are replies to a note.
     */
    getAllRepliesPerNote() {};

    /**
     * Get the media work that a note is related to.
     */
    getMediaWorkOfNote() {};

    /**
     * Get the user that wrote a note.
     */
    getNoteAuthor() {};
    
    /**
     * "Delete" a note. This means that the note is not actually deleted 
     * from the database, but the current timestamp is saved in note_deleted_ts.
     */
    deleteNote() {};

    addNoteIdToUserNotesIds() {};

    addNoteIdToMediaWorkNotesIds() {};

    addReplyNoteIdToNotesIds() {};
}

Note.init({
    noteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'note_id'
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_id'
    },
    noteContent: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'note_content'
    },
    mediaId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        field: 'media_id'
    },
    noteCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: Sequelize.NOW,
        field: 'note_created_ts'
    },
    noteUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'note_updated_ts'
    },
    noteDeletedTS: {
        type: DataTypes.DATE,
        allowNull: true, 
        field: 'note_deleted_ts'
    },
    replyToNoteId: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        field: 'reply_to_note_id'
    },
}, {
    sequelize,
    modelName: 'Note',
    tableName: 'notes',
    timestamps: true,
    createdAt: 'note_created_ts',
    updatedAt: 'note_updated_ts'
});

Note.associate = (models) => {
    Note.belongsTo(models.User, { 
        foreignKey: 'user_id', 
        as: 'noteAuthor' 
    });
};

module.exports = Note;
