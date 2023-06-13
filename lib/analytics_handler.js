import handleErrors from  "./error_handler";

/**
 * Send to BE info. Also sends a browser console message.
 * TODO: Google Analytics integration
 * TODO: Set up messages to Slack
 * 
 * @param {string} eventMsg - The event message to log
 * @param {string} errorMsg - The error message to log
 * @param {string} noteMsg - The note message to log
 * 
 * @returns {void}
 */
const analytics = {
    gaEvent: function (eventMsg) {
        console.log("Event logged: " + eventMsg);
    },
    logError: function (errorMsg) {
        handleErrors(errorMsg);

        console.log("Error logged: " + errorMsg);
    },
    logNote: function (noteMsg) {
        console.log("Note: " + noteMsg);
    }
};

export default analytics;
