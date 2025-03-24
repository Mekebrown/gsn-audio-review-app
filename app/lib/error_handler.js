/**
 * Handles errors by sending a standardized JSON response.
 *
 * @param {Object} res - The response object.
 * @param {number} errorCode - The HTTP status code for the error.
 * @param {string} errorMessage - A descriptive error message.
 * @param {string} route - The route where the error occurred.
 */
const handleErrors = (res, errorCode, errorMessage, route) => {
    console.error(`Error in route ${route}: ${errorMessage}`);

    res.status(errorCode).json({
        success: false,
        error: {
            code: errorCode,
            message: errorMessage,
            route,
        },
    });
};

export default handleErrors;
