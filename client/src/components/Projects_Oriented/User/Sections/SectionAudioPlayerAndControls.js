import React, { useState } from "react";

/**
 * @returns {Node} SectionAudioPlayerAndControls
 */
const SectionAudioPlayerAndControls = ({playerDetails}) => {
    const [fileName, thumbRating] = playerDetails;
    
    const [prevThumbRating, setThumbRating] = useState(thumbRating);

    const handleThumbRatingClick = (clickedBtn) => {
        setThumbRating(clickedBtn);
    };

    // Play, volume change, pause, stop, reset
    const handleAudioControlsClick = (clickedBtn) => {
        console.log("Placeholder");
    };

    return (
        <>
            &nbsp; 
            {prevThumbRating && (
                <div>
                    <button
                        value="approve" 
                        id="trackApproved" 
                        onClick={() => handleThumbRatingClick("up")}
                    >
                        &#128077;
                    </button>
                    &nbsp;
                    <button 
                        value="disapprove" 
                        id="trackDisapproved" 
                        onClick={() => handleThumbRatingClick("down")}
                    >
                        &#128078;
                    </button>
                </div>
            )}
            <audio controls id="audioPlayer" preload="auto" src={fileName}>
                Unfortunately, audio tags are not supported on your device. Please install this app on another device to use.
            </audio>
            
            <div id="audioControls">
                <button id="playPause" onClick={() => {handleAudioControlsClick("play")}}>Play</button>
                <button id="reload" onClick={() => {handleAudioControlsClick("reload")}}>Reload</button>
                <button id="toggleNotePad" onClick={() => {handleAudioControlsClick("toggleNotePad")}}>Make A Note</button>
            </div>
        </>
    );
};

export default SectionAudioPlayerAndControls;