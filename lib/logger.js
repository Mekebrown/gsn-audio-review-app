const fs = require("fs");

/**
 * The Details object will have the following properties:
 * - desc: string of a short description of the log
 * - message: string of the message to be logged
 * - req: object, if provided
 * - res: object, if provided
 * - headers: object, if provided
 * 
 * @param {object} details 
 */
const logger = (details) => {
  let current = ((new Date()).toLocaleString()).replace(/\D*/g, "");
  let file_name = `./files/logs/${details.desc}${current}.log`;

  let log_data = {
    message: details.message,
    req: details.req ? details.req : "N/A",
    res: details.res ? details.res : "N/A",
    headers: details.headers ? details.headers : "N/A",
  };

  fs.writeFile(file_name, JSON.stringify(log_data, null, "\t"), "utf8", (error, data) => {
    console.log(`Write complete! Error: ${error} | Data: ${data}`);
  });
};

module.exports = logger;
