import React from "react";

/**
 * S/E
 * 
 * @returns {Node} AudioPlayer
 */
const AudioPlayer = () => {
    return (
        <>
            &nbsp; 
            <button value="approve" id="trackApproved">
                &#128077;
            </button> &nbsp; 
            <button value="disapprove" id="trackDisapproved">
                &#128078;
            </button> 

            <audio controls id="audioPlayer" preload="auto">
                Unfortunately, audio tags are not supported on your device. Please install this app on another device to use.
            </audio>
            
            <div id="audioControls">
                <button id="playPause">Play</button>
                <button id="reload">Reload</button>
                <button id="toggleNotePad">Make A Note</button>
            </div>
        </>
    );
};

export default AudioPlayer;