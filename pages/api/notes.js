import { Note } from "../../db/models";
import handleErrors from "../../lib/error_handler";

/** 
 * Add new note's id to the media work's notes_ids array, the user's notes_ids array, and if it is a reply, a note's notes_ids.
 * 
 * @param {Object} new_note_info
 * 
 * @returns {Object|false} new_note
 */
const createANote = async (new_note_info) => {
  const sanitized_note_info = sanitizeNoteInfo(new_note_info);

  const validated_note_info = validateNoteInfo(sanitized_note_info);

  const new_note = await Note.create(validated_note_info);

  await new_note.createNote();

  const note_author_id = new_note.user_id;
  const media_work_id = new_note.media_id;
  const replied_note_id = new_note.reply_to_note_id;

  const is_in_user_notes_ids = new_note.addNoteIdToUserNotesIds(note_author_id);
  const is_in_media_work_notes_ids = new_note.addNoteIdToMediaWorkNotesIds(media_work_id);
  const is_reply_in_notes_ids = new_note.addReplyNoteIdToNotesIds(replied_note_id);

  if (is_in_user_notes_ids && is_in_media_work_notes_ids && is_reply_in_notes_ids) {
    return new_note;
  }

  return false;
};

/**
 * Get all notes. This will include the users that wrote each note, the reply notes to each note, and the media work each belongs to.
 * 
 * @returns {Array} notes
 */
const getAllNotes = async () => {
  const notes = await Note.findAll();

  notes.forEach(note => {
    const { users, media_work, reply_notes } = getRelatedInfo(note.note_id);

    note.users = users;
    note.media_work = media_work;
    note.reply_notes = reply_notes;

    return note;
  });

  return notes;
};

/**
 * @param {number} note_id
 * 
 * @returns {Object} users, media_work, reply_notes
 */
const getRelatedInfo = async (note_id) => {
  const note = await Note.findByPk(note_id);

  const users = await note.getNoteAuthor();
  const media_work = await note.getMediaWorkOfNote();
  const reply_notes = await note.getAllRepliesPerNote();

  return {
    users,
    media_work,
    reply_notes
  };
};

/**
 * @param {Object} info
 * 
 * @returns {Boolean}
 */
const validateNoteInfo = (info) => {
  const { email, password } = info;

  if (!email || !password) {
    return false;
  }

  return true;
};

/**
 * GET will get all notes. This includes the users that wrote each note, the reply notes to each note, and the media work each belongs to.
 * 
 * POST will create a new note. This will include the user_id of the author and the media work's id it belongs to. Then the note's new id will be returned. This id will be added to the media work's notes array and the user's notes array.
 * 
 * @param {Object} req
 * @param {Object} res
 */
export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const all_notes = getAllNotes();

    res.status(200).json({ 
      route: "notes",
      all_notes 
    });
  } else if (method === "POST") {
    const info = req.body;

    const created_note = createANote(info);

    res.status(200).json({ 
      route: "notes",
      created_note 
    });
  }

  // If the method is not GET or POST, return a 405 error.
  handleErrors(res, 405, "Method not allowed", "signins");
  
  res.status(405).json({
    error: "Method not allowed",
    route: "signins"
  });
};
