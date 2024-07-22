import mediaTrackExample from "@/app/lib/media_placeholders";

/**
 * @description Component for a media player 
 *
 * @component
 * 
 * @returns {JSX.Element}
 * <Player />
 */
export default function Player() {
    const oneTrack = mediaTrackExample[0];

    return <figure>
        <figcaption>{oneTrack.title}</figcaption>
        <audio controls src={oneTrack.mp3}></audio>
    </figure>;
};
