/**
 * The Details object will have the following properties:
 * - desc: string of a short description of the log
 * - message: string of the message to be logged
 * - req: object, if provided
 * - res: object, if provided
 * - headers: object, if provided
 * 
 * @param {Object} details 
 */
export const logger = (details) => {
  const current = ((new Date()).toLocaleString()).replace(/\D*/g, "");
  const file_name = `./files/logs/${details.desc}${current}.log`;

  const log_data = {
    file_name,
    message: details.message,
    req: details.req ? details.req : "N/A",
    res: details.res ? details.res : "N/A",
    headers: details.headers ? details.headers : "N/A",
  };
};
