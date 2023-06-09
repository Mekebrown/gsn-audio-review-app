import { Note } from "../../db/models";
import handleErrors from "../../lib/error_handler";

/**
 * @param {string} id
 * 
 * @returns {Object}
 */
const getNoteInfo = async (id) => {
  const note = await Note.findOne({
    where: {
      id: id
    }
  });

  return note;
};

/**
 * @param {Object} updated_note_info
 * 
 * @returns {Boolean}
 */
const updateNote = async (updated_note_info) => {
  const note = await Note.save(updated_note_info);

  // Does this return the updated note?
  const updated_note = await note.saveNote();

  if (updated_note) {
    return true;
  }

  return false;
};

/**
 * @param {Object} deleted_note_info
 * 
 * @returns {Boolean}
 */
const deleteSingleNote = async (deleted_note_info) => {
  const note = await Note.destroy(deleted_note_info);

  const is_deleted = await note.destroyNote();

  if (is_deleted) {
    return true;
  }

  return false;
};

/**
 * @param {Object} info
 * 
 * @returns {Object}
 */
const validateNoteInfo = (info) => {
    const { email, password } = info;
  
    if (!email || !password) {
      return false;
    }
  
    return validated_note_info;
};

/**
 * @param {Object} info
 * 
 * @returns {Object}
 */
const sanitizeNoteInfo = (info) => {
};

/**
 * @param {Object} req 
 * @param {Object} res 
 */
export default function handler( req, res ) {
    const { method } = req;
    const { id } = req.query;

    if (method === "GET") {
      const note_info = getNoteInfo(id);

      res.status(200).json({ 
        route: "notes/id",
        note: note_info 
      });
    } else if (method === "PUT") {
        const info = req.body;
    
        const is_note_updated = updateNote(info);

        res.status(200).json({ 
          route: "notes",
          is_note_updated 
        });
    } else if (method === "DELETE") {
      const is_note_deleted = deleteSingleNote(id);
  
      res.status(200).json({ 
        route: "notes",
        is_note_deleted 
      });
    }

    handleErrors(res, 405, "Method not allowed", "notes");
    
    res.status(405).json({
      error: "Method not allowed",
      route: "notes"
    });
};
