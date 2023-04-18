// Analytics service

var analytics = {
    logEvent: function logEvent(eventName) {
        console.log("Event logged: " + eventName);
    }
};

module.exports = analytics;
