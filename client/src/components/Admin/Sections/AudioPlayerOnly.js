import React, { useState } from "react";

/**
 * @returns {Node} SectionAudioPlayerAndControls
 */
const SectionAudioPlayerAndControls = ({playerDetails}) => {
    const [fileName, thumbRating] = playerDetails;
    const [prevThumbRating, setThumbRating] = useState(thumbRating);

    const sources = [
        {item: 1, ext: "mp3", type: "audio/mpeg"}, 
        {item: 2, ext: "ogg", type: "audio/ogg"}
    ];

    const handleThumbRatingClick = (clickedBtn) => {
        setThumbRating(clickedBtn);
    };

    // Play, pause, reset - TODO volume change, stop
    const handleAudioControlsClick = (clickedBtn) => {
        const thePlayer = document.querySelector("#audioPlayer");

        if (clickedBtn === "reload") {
            thePlayer.currentTime = 0.0;
                thePlayer.pause();
        } else {
            if (thePlayer.currentTime === 0.0 || thePlayer.paused) {
                thePlayer.play(); 
            } else  {
                thePlayer.pause(); 
            }
        }
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
            <audio controls id="audioPlayer" preload="auto">
                {
                    sources.map(source => {
                        let fileSrc = fileName + "." + source.ext;

                        return <source key={source.item} src={fileSrc} type={source.type} />
                    })
                }
                Unfortunately, audio tags are not supported on your device. Please install this app on another device to use.
            </audio>
            
            <div id="audioControls">
                <button id="playPause" onClick={() => {handleAudioControlsClick("togglePlayPause")}}>Play</button>
                <button id="reload" onClick={() => {handleAudioControlsClick("reload")}}>Reload</button>
            </div>
        </>
    );
};

export default SectionAudioPlayerAndControls;