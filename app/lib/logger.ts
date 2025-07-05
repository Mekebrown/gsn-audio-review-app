import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

/**
 * @param {string} logsDir 
 */
const ensureLogsDirectory = (logsDir: string) => {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
};

/**
 * Generate a dynamic log file name based on the current date and time
 * 
 * @returns string
 */
const getLogFileName = (): string => {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS

  return `error-${date}-${time}.log`;
};

/**
 * Define the logs directory
 */
const logsDir = path.resolve('./files/logs');

ensureLogsDirectory(logsDir);

/**
 * Create a new Winston logger instance
 */
const logger = createLogger({
  level: 'error', // Log only errors
  format: format.combine(
    format.timestamp(),
    format.json() // better readability
  ),
  transports: [
    new transports.File({
      filename: path.join(logsDir, getLogFileName()), 
    }),
  ],
});

/**
 * Logs various types of occurrences such as errors, warnings, alerts, etc.
 * 
 * @param {Object} details - Details of the log entry
 * @param {string} details.desc - Short description of the log
 * @param {string} details.message - Message to be logged
 * @param {object} [details.req] - Optional request object
 * @param {object} [details.res] - Optional response object
 * @param {object} [details.headers] - Optional headers object
 */
export const logDetails = (details: {
  desc: string;
  message: string;
  req?: object;
  res?: object;
  headers?: object;
}): void => {
  try {
    const logData = {
      timestamp: new Date().toISOString().slice(0, 10),
      description: details.desc || 'No description provided',
      message: details.message || 'No message provided',
      request: details.req || 'N/A',
      response: details.res || 'N/A',
      headers: details.headers || 'N/A',
    };

    logger.error(logData);

    console.log(`Log written: ${details.desc}`);
  } catch (error) {
    console.error('Failed to log details:', error);
  }
};

export default logger;
