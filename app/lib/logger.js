import fs from "fs";
import path from "path";

/**
 * Logs various types of occurrences such as errors, warnings, alerts, etc.
 * 
 * The Details object should have the following properties:
 * - desc {string} - Short description of the log
 * - message {string} - Message to be logged
 * - req {object} [optional] - Request object
 * - res {object} [optional] - Response object
 * - headers {object} [optional] - Headers object
 * 
 * @param {Object} details - Details of the log entry
 */
export const logger = (details) => {
  try {
    // Generate a timestamped log file name
    const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
    const fileName = `${details.desc}_${timestamp}.log`;
    const logFilePath = path.resolve("./files/logs", fileName);

    // Prepare log data
    const logData = {
      timestamp: new Date().toISOString(),
      description: details.desc || "No description provided",
      message: details.message || "No message provided",
      request: details.req || "N/A",
      response: details.res || "N/A",
      headers: details.headers || "N/A",
    };

    // Convert log data to a formatted string
    const logContent = JSON.stringify(logData, null, 2);

    // Ensure the logs directory exists
    const logsDir = path.dirname(logFilePath);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Write the log data to the file
    fs.writeFileSync(logFilePath, logContent, "utf8");

    console.log(`Log written to: ${logFilePath}`);
  } catch (error) {
    console.error("Failed to write log:", error);
  }
};
