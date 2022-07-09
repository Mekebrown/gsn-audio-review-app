import react, { useRef } from "react";
import "./UploadMedia.css";

/**
 * Lets Lance upload files
 * 
 * @returns {Node} UploadMedia
 */
const UploadMedia = () => {
    let mediaForm = useRef(null);

    const handleMediaUploadSubmit = (e) => {
        e.preventDefault();

        fetch('/media', {
            method: 'POST',
            mode: 'cors',
            body: e.target,
        })
        .then(response => { if (response.ok) console.log('Success:');})
        .catch(error => { console.error('Error:', error); });
    };

    return <form action="action_page.php" method="POST" onSubmit={handleMediaUploadSubmit} ref={mediaForm}>
            <div className="mediaContainer">
                <h1>Upload new media</h1>
                
                <p>Please fill in this form to upload new media and add details if you wish.</p>

                <label htmlFor="media"><strong>Upload your media file: </strong>
                    <input type="file" placeholder="Location" name="media" id="media" required />
                </label>

                <label htmlFor="media-type"><strong>What kind of media file is this? </strong>
                    <select name="media-type" id="media-type">
                        <option value="audio">Audio</option>
                        <option value="video">Video</option>
                        <option value="document">Document</option>
                        <option value="etc">Etc.</option>
                    </select>
                </label>

                <label htmlFor="project-name"><strong>Project Name for media: </strong>
                    <input type="text" placeholder="Project name" name="project-name" id="project-name"/>
                </label>

                <label htmlFor="description"><strong>Describe the project: </strong>
                    <input type="text" placeholder="Description" name="description" id="description" />
                </label>

                <div>
                    <button type="button" className="cancelbtn" onClick={()=>mediaForm.current.reset()}>Cancel</button>
                    <button type="submit" className="signupbtn">Upload</button>
                </div>
            </div>
        </form>;
}

export default UploadMedia;