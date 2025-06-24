import { allMedia as allMediaFunc } from "@/app/lib/media_placeholders";

export async function generateStaticParams() {
    const allMedia = await allMediaFunc();

    return allMedia.map(media => ({
        id: media.id.toString(),
        title: media.title || 'Unknown Media Type',
        description: media.description || 'No Media Provided',
    }));
}

/**
 * /media/:media - msg, title, description, form (textarea, submit button, cancel button), notes list
 * /media/:media - msg (edit), title (edit), description (edit), list of each note (reply to note link (form: textarea, submit button, cancel button)) 
 * 
 * @description A Modal component showing a form to 
 * configure and send a new user their
 * account details
 * 
 * @returns {JSX.Element}
 */
export default async function Page({
  params,
}) {
    const { id, title, description } = await params;

    return <section className="media-profile" data={"media-profile-" + id}>
        <h1>Media page for</h1>
        <div>Title: {title}</div>
        <div>Description: {description}</div>

        <h2>NEED PLAYER, NOTES FIELD, RATINGS FEATURES</h2>

        <form style="display: none;">
            <textarea
                name="note"
                placeholder="Add a note about this media..."
                rows="4"
                cols="50"
                style={{ resize: "none" }}
            ></textarea>

            <input
                type="text"
                name="title"
                placeholder="Title of your note"
                required
            />

            <input
                type="text"
                name="description"
                placeholder="Description of your note"
                required
            />

            <input
                type="text"
                name="rating"
                placeholder="Rating (1-5)"
                required
                pattern="[1-5]"
                title="Please enter a rating between 1 and 5"
            />

            <button type="submit">Make A Note</button> &nbsp; <button type="reset">Clear All</button>
        </form>
        
    </section>;
};
