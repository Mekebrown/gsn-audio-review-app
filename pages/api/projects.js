import { Media } from "../../db/models";

/** 
 * @param {Object} media_info
 */
const createAMediaWork = async (media_info) => {
  const media_work = await Media.create(media_info);

  await media_work.createNote();
};

/**
 * TODO: The handler will have validation and
 * error handling in the future. Also it will have 
 * a better way to handle the response. As well,
 * it will have a better way to handle the request.
 * 
 * @param {Object} req
 * @param {Object} res
 */
export default function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const info = req.body;

    res.status(200).json({ 
      route: "media" 
    });
  } else if (method === "GET") {
    const info = req.body;

    res.status(200).json({ 
      route: "media" 
    });
  } else if (method === "PUT") {
    const info = req.body;

    res.status(200).json({ 
      route: "media" 
    });
  } else if (method === "DELETE") {
    const info = req.body;

    res.status(200).json({ 
      route: "media" 
    });
  }
};
