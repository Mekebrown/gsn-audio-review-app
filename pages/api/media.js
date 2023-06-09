import { Media } from "../../db/models";
import handleErrors from "../../lib/error_handler";

/** 
 * Create a new media work. Also add the new media_id to a project's media_ids field.
 * 
 * @param {Object} new_media_info
 * 
 * @returns {Boolean}
 */
const createAMediaWork = async (new_media_info) => {
  const validated_media_info = validateMediaInfo(new_media_info);

  const media_work = await Media.create(validated_media_info);

  await media_work.createMedia();

  // Return a true if the media db record was created successfully.
  if (media_work) {
    return true;
  }

  return false;
};

/**
 * Get all the media works. This will include the users assigned to the media work, the project it belongs to, and every note posted about it.
 * 
 * @returns {Array} media_works
 */
const getAllMediaWorks = async () => {
  const media_works = await Media.findAll();

  media_works.forEach(media_work => {
    const { users, project, notes } = getRelatedInfo(media_work.media_id);

    media_work.users = users;
    media_work.project = project;
    media_work.notes = notes;

    return media_work;
  });

  return media_works;
};

/**
 * @param {number} media_work_id 
 * 
 * @returns {Object} users, project, notes
 */
const getRelatedInfo = async (media_work_id) => {
  const media_work = await Media.findByPk(media_work_id);

  const users = await media_work.getUsersOfMediaWork();
  const project = await media_work.getProjectOfMediaWork();
  const notes = await media_work.getNotesOfMediaWork();

  return {
    users,
    project,
    notes
  };
};

/**
 * @param {Object} info
 * 
 * @returns {Boolean}
 */
const validateMediaInfo = (info) => {
  const { email, password } = info;

  if (!email || !password) {
    return false;
  }

  return true;
};

/**
 * GET will get all the media works. This includes the users assigned to the media work, the project it belongs to, and every note posted about it.
 * 
 * POST will create a new media work. This will include the project it belongs to. A new id will be generated for the media work. This new id will be added to the project's media_ids array.
 * 
 * @param {Object} req
 * @param {Object} res
 */
export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const all_media_works = getAllMediaWorks();

    res.status(200).json({
      media: all_media_works,
      route: "media"
    });
  } else if (method === "POST") {
    const unsanitized_info = req.body;

    const new_media_and_id = createAMediaWork(unsanitized_info);

    res.status(200).json({ 
      route: "media",
      new_media_obj: new_media_and_id
    });
  }

  // If the method is not GET or POST, return a 405 error.
  handleErrors(res, 405, "Method not allowed", "signins");
  
  res.status(405).json({
    error: "Method not allowed",
    route: "signins"
  });
};
