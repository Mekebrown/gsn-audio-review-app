const Media = { id: 1, email: "two @ two.com", password: "two" };

/**
 * @param {string} id
 * 
 * @returns {Object}
 */
const getSingleMediaInfo = async (id) => {
    const media = await Media.findOne({
        where: {
            id: id
        }
    });

    return media;
};

/**
 * @param {Object} updated_media_info
 * 
 * @returns {Boolean}
 */
const updateSingleMedia = async (updated_media_info) => {
    const media = await Media.save(updated_media_info);

    // Does this return the updated media?
    const updated_media = await media.saveMedia();

    if (updated_media) {
        return true;
    }

    return false;
};

/**
 * @param {Object} deleted_media_info
 * 
 * @returns {Boolean}
 */
const deleteSingleMedia = async (deleted_media_info) => {
    const media = await Media.destroy(deleted_media_info);

    const is_deleted = await media.destroyMedia();

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
const validateMediaInfo = (info) => {
    const { email, password } = info;

    if (!email || !password) {
        return {
            error: "Email and password are required."   
        };
    }

    return validated_media_info;
};

/**
 * @param {Object} info
 * 
 * @returns {Object}
 */
const sanitizeMediaInfo = (info) => {
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
export default function handler( req, res ) {
    const { method } = req;
    const { id } = req.query;

    if (method === "GET") {
        const media_work = getSingleMediaInfo(id);
    
        res.status(200).json({
          route: "media/id",
          media: media_work
        });
    } else if (method === "PUT") {
        const updated_media_info = req.body;

        const is_media_updated = updateSingleMedia(updated_media_info);
    
        res.status(200).json({ 
            route: "media/id",
            is_media_updated
        });
    } else if (method === "DELETE") {
        const is_media_deleted = deleteSingleMedia(id);

        res.status(200).json({ 
            route: "media/id",
            is_media_deleted
        });
    }

    handleErrors(res, { code: 405}, "Method not allowed", "media");
    
    res.status(405).json({
      error: "Method not allowed",
      route: "media"
    });
};
