/**
 * What types of occurrences do I want to log?
 * - Errors
 * - Warnings
 * - Alerts
 * - Exceptions
 * - Performance issues and bottlenecks
 * - Security-related events (too many sign in attempts, accessing a restricted or non-existent page, auth issues, etc.)
 * 
 * The Details object will have the following properties:
 * - desc string - short description of the log
 * - message string - message to be logged
 * - req object
 * - res object
 * - headers object
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
