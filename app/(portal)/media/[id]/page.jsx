import { allMedia as allMediaFunc } from "@/app/lib/media_placeholders";
import { allNotesForMedia as allNotesForMediaFunc } from "@/app/lib/notes_placeholders";

// export async function generateStaticParams() {
const getMediaInfo = async () => {
    const allMedia = await allMediaFunc();

    const resultingArray = allMedia.map(media => ({
        id: media.documentId.toString(),
        title: media.title || 'Unknown Media Type',
        description: media.description || 'No Media Provided',
        mediaFileName: media.media_file_name || 'Unknown Media File Name YET',
        mediaFileExt: media.media_file_ext || 'Unknown File Extension YET',
        thumbnail_url: media.thumbnail_url && media.media_url.includes("http") ? media.media_url : 'No Thumbnail Available',
        createdAt: media.created_at || 'No Creation Date Available',
        mediaId: media.documentId,
        mediaUrl: media.media_url && media.media_url.includes("http") ? media.media_url : `/media/${media.documentId}/${media.media_file_name}.${media.media_file_ext}`,
        mediaType: media.media_file_ext ? media.media_file_ext.toLowerCase() : 'unknown'
    }));

    return resultingArray;
};

/**
 * /media/:media - msg, title, description, form (textarea, submit button, cancel button), notes list
 * /media/:media - msg (edit), title (edit), description (edit), list of each note (reply to note link (form: textarea, submit button, cancel button)) 
 * 
 * I need to know the media and I need to display the notes for that media,
 * where the notes are in order of creation date, and the most recent
 * note is at the top of the list.
 * 
 * @description A Modal component showing a form to 
 * configure and send a new user their
 * account details
 * 
 * @returns {JSX.Element}
 */
// export default async function Page({
//   params,
// }) {
export default async function Page() {
    const items = await getMediaInfo();
    const { id, title, description, thumbnail_url, mediaUrl, mediaType, mediaId } = items[0];
    const signedInUser = {
        id: 1,
        username: "User Name"
    };
    const noteWriter = "Writer Name";

    const mediaNotesArray = await allNotesForMediaFunc(mediaId)
        .then(returnedNotes => {
            return returnedNotes.data.map(note => {
                if (mediaId == note.media.documentId) {
                    return {
                        id: note.documentId,
                        body: note.body,
                        userId: note.users_permissions_user.id,
                        timestamp: note.timestamp,
                        createdAt: note.createdAt,
                        updatedAt: note.updatedAt,
                        publishedAt: note.publishedAt,
                    };
                }
            });
        });

    return <section className="media-profile" data={"media-profile-" + id}>
        <h1>Media page for</h1>

        <div>Title: {title}</div>
        
        <div>Description: {description}</div>

        {/* Media Player */}
        <div style={{ margin: "1em 0" }}>
            {mediaType === "mp4" || mediaType === "webm" ? (
                <video
                    src={mediaUrl}
                    controls
                    width="480"
                    poster={thumbnail_url}
                    style={{ borderRadius: "8px", background: "#222" }}
                />
            ) : mediaType === "mp3" || mediaType === "wav" ? (
                <audio
                    src={mediaUrl}
                    controls
                    style={{ width: "100%" }}
                />
            ) : mediaType === "jpg" || mediaType === "jpeg" || mediaType === "png" || mediaType === "gif" ? (
                <img
                    src={mediaUrl}
                    alt={title}
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
            ) : (
                <div>No preview available for this media type.</div>
            )}
        </div>

        {/* Ratings and Notes Field */}
        <form style={{ margin: "1em 0", display: "block", width: "400px" }}>
            <label htmlFor="media-rating">
                <strong>Rate this media:</strong>
            </label>
            <select id="media-rating" name="media-rating" style={{ marginLeft: "0.5em" }}>
                <option value="">Select</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
            </select><br />

            <textarea
                name="body"
                placeholder="Add a note"
                rows="4"
                cols="50"
                style={{ resize: "none", width: "100%" }}
            ></textarea><br />

            <input type="hidden" name="user-id" value={signedInUser.id} />
            <input type="hidden" name="media-id" value={mediaId} />
            <input type="hidden" name="timestamp" value={new Date().toISOString().slice(0, 10)} />

            <div style={{ marginTop: "0.5em" }}>
                <button type="submit">Make A Note</button>
                &nbsp;
                <button type="reset">Clear All</button>
            </div>
        </form>
        
        {/* Notes List */}
        {mediaNotesArray !== undefined && (<>
            <h3>Notes</h3>

            <ul>
                {mediaNotesArray.sort((a, b) => (
                    new Date(b.createdAt).toLocaleDateString('en-US', { timeZone: 'UTC' })
                ) - (
                    new Date(a.createdAt)).toLocaleDateString('en-US', { timeZone: 'UTC' })
                ).map(note => (
                    <li key={note.documentId} style={{ marginBottom: "1em" }}>
                        <div>
                            <strong>{noteWriter}</strong> 
                            
                            <span style={{ color: "#888" }}>
                                {new Date(note.createdAt).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                            </span>
                        </div>

                        <div>{note.body}</div>
                    </li>
                ))}
            </ul>
        </>)
        }
    </section>;
};
