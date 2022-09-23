const values = {
    projectName: "Track Audio",
    createdOn: null,
    currentTime: 0
};

const sources = [
    { item: 1, ext: "mp3", type: "audio/mpeg" },
    { item: 2, ext: "ogg", type: "audio/ogg" }
];

// Convert audioPoint to a string of a human-readable timestamp, as this value's example shows
const getMarker = (isAudioPlayed, audioPlayer, noteStartDate, project) => {
    if (!isAudioPlayed) return false;

    let audioMinutes = Math.floor(audioPlayer.currentTime / 60); // Use audioPlayer.duration?
    let audioSeconds = Math.floor(audioPlayer.currentTime % 60);

    if (audioMinutes < 10) {
        audioMinutes = "0" + audioMinutes;
    } else if (audioMinutes > 59) {
        audioMinutes = audioMinutes / 60;
        audioMinutes = audioMinutes < 9 ? "0" + audioMinutes : audioMinutes;
    }

    if (audioSeconds < 10) {
        audioSeconds = ":0" + audioSeconds;
    } else if (audioSeconds > 59) {
        audioSeconds = audioSeconds / 60;

        if (audioSeconds < 9) {
            audioSeconds = ":0" + audioSeconds;
            audioMinutes = "01";
        }
    } else audioSeconds = ":" + audioSeconds;

    let marker = audioMinutes + audioSeconds;
    // Ex: 12122021_gsn_03:10:00
    let noteID = noteStartDate + "_" + project + "_" + marker;

    return marker, noteID;
};
const digest = () => {
    if ("admin is webmaster") {
        /**
         * Email every app change
         */
    }

    if ("admin is Lance and digest was not already sent out") {
        /** 
         * mailto: admin@something.net
         * mailfrom: thesite
         * subject: Digest
         * body: 
         *      Relevant info:
         *      - User saved # of notes in a day
         *      - Guest visits per day to the app
         *      - User visits per day to the app
         *      - Guest visits per day to a project
         *      - User visits per day to a project
         * */
    }
};

export default values;
export { sources };
