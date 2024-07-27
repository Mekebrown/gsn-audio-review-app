/**
 * @description Component for a media player
 *
 * @component
 * 
 * @returns {JSX.Element} <Player />
 */
export default function Player({ title, track, desc, captions }) {
    return <>
        <details>
            <summary>{title}</summary>

            <p>{desc}</p>
            <time dateTime="2008-02-14 20:00">2/14/2024</time>
        </details>

        <audio controls>
            <source src={track[0]} type="audio/mpeg"></source>
            <source src={track[1]} type="audio/ogg"></source>
            <track src={captions} kind="subtitles" srcLang="en" label="English"></track>
            Your browser does not support the audio element.
        </audio>
    </>;
};
