import { v4 as uuidv4 } from "uuid";

import { User } from "../../db/models";
import handleErrors from "../../lib/error_handler";

/** 
 * @param {Object} new_user_info
 * 
 * @returns {Boolean}
 */
const createAUser = async (new_user_info) => {
  const validated_users_info = validateUserInfo(new_user_info);

  // Make sure to use uuidv4() to generate a unique id.
  validated_users_info.id = uuidv4();

  const user = await User.create(validated_users_info);

  await user.createUser();

  // Return a true if the user was created successfully.
  if (user) {
    return true;
  }

  return false;
};

/**
 * Get all the users. This includes their notifications, depending on their role.
 * 
 * @returns {Array} users
 */
const getAllUsers = async () => {
  const users = await User.findAll();

  users.forEach(user => {
    const notifs = getNotificationsPerUser(user.user_id);

    user.notifications = notifs;

    return user;
  });
  
  return users;
};

/**
 * @param {string} user_id 
 * 
 * @returns {Array} notifications
 */
const getNotificationsPerUser = async (user_id) => {
  const user = await User.findByPk(user_id);

  const notifications = await user.getUserNotifications();

  return notifications;
};

/**
 * @param {Object} info
 * 
 * @returns {Boolean}
 */
const validateUserInfo = (info) => {
  const { email, password } = info;

  if (!email || !password) {
    return false;
  }

  return true;
};

/**
 * GET will get all users and their notifications which consists of their new replies to notes they wrote, new projects they were added to, and new media works they are to review.
 * 
 * POST will create a user with required info, 
 * including a hashed password.
 * 
 * @param {Object} req
 * @param {Object} res
 */
export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const all_users = getAllUsers();

    res.status(200).json({ 
      users: all_users,
      route: "users" 
    });
  } else if (method === "POST") {
    const info = req.body;

    const is_user_created = createAUser(info);

    res.status(200).json({ 
      route: "users",
      user_created: is_user_created
    });
  }

  // If the method is not GET or POST, return a 405 error.
  handleErrors(res, 405, "Method not allowed", "users");

  res.status(405).json({
    error: "Method not allowed",
    route: "users"
  });
};
