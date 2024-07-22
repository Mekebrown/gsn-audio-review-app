import handleErrors from  "./error_handler";

/**
 * Send to BE info. Also sends a browser console message.
 * TODO: Google Analytics integration
 * TODO: Set up messages to Slack
 */
const analytics = {
    /**
    * @param {string|Error|null} eventMsg - The event message to log
    */
    gaEvent: function (eventMsg) {
        console.log("Event logged: " + eventMsg);
    },
    /**
     * @param {string|Error|null} errorMsg - The error message to log
     */
    logError: function (errorMsg) {
        handleErrors({}, {}, errorMsg, "");

        console.log("Error logged: ");
        console.log({errorMsg});
    },
    /**
     * @param {string|Error|null} noteMsg - The note message to log
     */
    logNote: function (noteMsg) {
        console.log("Note: " + noteMsg);
    }
};

export default analytics;
