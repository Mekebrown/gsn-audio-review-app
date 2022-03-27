import React, { useEffect, useState } from "react";
import Axios from "axios";
import testAudio from "../../tools/envs";

/**
 * @returns {Node} AudioPlayerAndControls
 */
const AudioPlayerAndControls = ({playerDetails}) => {
    const [fileName, thumbRating, mediaId, mediaDesc, userId] = playerDetails;
    const [prevThumbRating, setThumbRating] = useState(thumbRating);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const thePlayer = document.querySelector("#audioPlayer");

    const sources = [
        {item: 1, ext: "mp3", type: "audio/mpeg"}, 
        {item: 2, ext: "ogg", type: "audio/ogg"}
    ];

    const handleThumbRatingClick = (clickedBtn) => {
        setThumbRating(clickedBtn);
        
        const infoToSend = [mediaId, userId, prevThumbRating];
    };

    // Play, pause, reset - TODO volume change, stop
    const handleAudioControlsClick = (clickedBtn) => {
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

    const holdThis = (source) => {
        let retrievalPath;

        const formData = new FormData();

        formData.append('media_id', mediaId);
        formData.append('file_name', fileName);
        formData.append('file_ext', source.ext);
        formData.append('file_type', source.type);

        Axios.get("http://localhost:3001/audio", {
            method: 'GET',
            body: formData
        }).then((results) => {
            retrievalPath = <source key={source.item} src={results} type={source.type} />
        });
        
        return retrievalPath;
    };

    const calculateTime = (seconds) => {
        if (duration && !isNaN(duration)) {
            const actualMinutes = Math.floor(seconds / 60);
            const FormattedMinutes = actualMinutes < 10 ? `0${actualMinutes}` : `${actualMinutes}`;
            const secsRemainder =  Math.floor(seconds % 60);
            const FormattedSeconds = secsRemainder < 10 ? `0${secsRemainder}` : `${secsRemainder}`;

            return `${FormattedMinutes}:${FormattedSeconds}`;
        }

        console.log("Not available");
    };

    useEffect(() => {
        if (thePlayer?.current?.duration) {
            const sec = Math.floor(thePlayer.current.duration);

            setDuration(thePlayer.current.duration);
        }
    }, []);

    return (
        <>
            &nbsp; 
            {prevThumbRating && ( // Swap out with react-icons?
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
                        return <source key={source.item} src={testAudio + source.ext} type={source.type} />
                    })
                }      
                Unfortunately, audio tags are not supported on your device. Please install this app on another device to use.
            </audio>
            <p>Project description: {mediaDesc}.</p>
            <div id="audioControls">
                <button id="playPause" onClick={() => {handleAudioControlsClick("togglePlayPause")}}>Play</button>
                <button id="reload" onClick={() => {handleAudioControlsClick("reload")}}>Reload</button>
            </div>
        </>
    );
};

export default AudioPlayerAndControls;