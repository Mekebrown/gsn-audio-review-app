import React, { useEffect, useState } from "react";
import Axios from "axios";
// import testAudio from "../../tools/envs";

/** 
 * When timeline point is clicked, update timestamp prop to current point
 * When the pause button is clicked, update timestamp prop to current point
 * 
 * @param {String} fileName
 * @param {Number} thumbRating
 * @param {Number} mediaId
 * @param {String} mediaDesc
 * @param {Number} userId
 * 
 * @returns {Node} AudioPlayerAndControls
 */
const AudioPlayerAndControls = ({fileName, thumbRating, mediaId, mediaDesc, userId}) => {
    // const [currentThumbRating, setCurrentThumbRating] = useState(thumbRating);
    // const [duration, setDuration] = useState(0);
    // const [playPauseBtnText, setPlayPauseBtnText] = useState("Play");

    // const thePlayer = document.querySelector(".audioPlayer");

    // const sources = [
    //     {item: 1, ext: "mp3", type: "audio/mpeg"}, 
    //     {item: 2, ext: "ogg", type: "audio/ogg"}
    // ];

    // const handleThumbRatingClick = (clickedBtn) => {
    //     setCurrentThumbRating(clickedBtn);
        
    //     const infoToSend = [mediaId, userId, currentThumbRating];
    // };

    // Play, pause, reset - TODO volume change, stop
    // const handleAudioControlsClick = (clickedBtn) => {
    //     if (clickedBtn === "reload") {
    //         thePlayer.currentTime = 0.0;
    //         thePlayer.pause();
    //     } else {
    //         if (thePlayer.currentTime === 0.0 || thePlayer.paused) {
    //             thePlayer.play(); 
    //             setPlayPauseBtnText("Pause");
    //         } else  {
    //             thePlayer.pause(); 
    //             setPlayPauseBtnText("Play");
    //         }
    //     }
    // };

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

    // useEffect(() => {
    //     if (thePlayer?.current?.duration) {
    //         const sec = Math.floor(thePlayer.current.duration);

    //         setDuration(thePlayer.current.duration);
    //     }
    // }, []);

    return (
        <>
            {/* {currentThumbRating && ( // Swap out with react-icons?
                <div>
                    <button
                        value="approve" 
                        className="trackApproved" 
                        onClick={() => handleThumbRatingClick("up")}
                    >
                        &#128077;
                    </button>
                    &nbsp;
                    <button 
                        value="disapprove" 
                        className="trackDisapproved" 
                        onClick={() => handleThumbRatingClick("down")}
                    >
                        &#128078;
                    </button>
                </div>
            )}
            
            <audio controls className="audioPlayer" preload="auto">
                {
                    sources.map(source => {
                        return <source key={source.item} src={testAudio + source.ext} type={source.type} />
                    })
                }
                Unfortunately, audio tags are not supported on your device. Please install this app on another device to use.
            </audio>

            <p>Project description: <em>{mediaDesc}</em>.</p>

            <div className="audioControls">
                <button className="playPause" onClick={() => {
                    handleAudioControlsClick("togglePlayPause")
                }}>{playPauseBtnText}</button>

                <button className="reload" onClick={() => {
                    handleAudioControlsClick("reload")
                }}>Reload</button>
            </div> */}
        </>
    );
};

export default AudioPlayerAndControls;