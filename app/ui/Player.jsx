/**
 * @description Component for a media player 
 *
 * @component
 * 
 * @returns {JSX.Element} <Player />
 */
export default function Player({ title, track }) {
    return <figure>
        <figcaption>{title}</figcaption>

        <audio controls src={track}></audio>
    </figure>;
};
