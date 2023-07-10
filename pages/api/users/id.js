const User = { id: 1, email: "two @ two.com", password: "two" };

/**
 * @param {string} id
 * 
 * @returns {Object}
 */
const getUserInfo = async (id) => {
    const user = await User.findOne({
        where: {
            id: id
        }
    });

    return user;
};

/** 
 * @param {Object} updated_user_info
 * 
 * @returns {Boolean}
 */
const updateAUser = async (updated_user_info) => {
    const user = await User.save(updated_user_info);
  
    // Does this return the updated user?
    const updated_user = await user.saveUser();

    if (updated_user) {
        return true;
    }

    return false;
};

/** 
 * @param {Object} deleted_user_info
 * 
 * @returns {Boolean}
 */
const deleteAUser = async (deleted_user_info) => {
    const user = await User.destroy(deleted_user_info);
  
    const is_deleted = await user.destroyUser();

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
const validateUserInfo = (info) => {
    const { email, password } = info;

    if (!email || !password) {
        return {
            error: "Email and password are required."
        };
    }

    return validated_user_info;
};

/**
 * @param {Object} info
 * 
 * @returns {Object}
 */
const sanitizeUsersInfo = (info) => {
};

/**
 * @param {Object} req 
 * @param {Object} res 
 */
export default function handler( req, res ) {
    const { method } = req;
    const { id } = req.query;

    if (method === "GET") {
        const user_info = getUserInfo(id);

        res.status(200).json({ 
            route: "users/id",
            user: user_info 
        });
    } else if (method === "PUT") {
        const updated_user_info = req.body;
    
        const is_user_updated = updateAUser(updated_user_info);
    
        res.status(200).json({ 
          route: "users",
          is_user_updated 
        });
    } else if (method === "DELETE") {
        const is_user_deleted = deleteAUser(id);

        res.status(200).json({ 
            route: "users/id", is_user_deleted
        });
    }

    handleErrors(res, { code: 405}, "Method not allowed", "users");
    
    res.status(405).json({
      error: "Method not allowed",
      route: "users"
    });
};
