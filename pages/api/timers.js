import { Timer } from "../../db/models";

/** 
 * @param {Object} timer_info
 */
const createATimer = async (timer_info) => {
  const timer = await Timer.create(timer_info);

  await timer.createTimer();
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
      route: "timers" 
    });
  } else if (method === "GET") {
    const info = req.body;

    res.status(200).json({ 
      route: "timers" 
    });
  } else if (method === "PUT") {
    const info = req.body;

    res.status(200).json({ 
      route: "timers" 
    });
  } else if (method === "DELETE") {
    const info = req.body;

    res.status(200).json({ 
      route: "timers" 
    });
  }
};
