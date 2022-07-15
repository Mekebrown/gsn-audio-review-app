import react, { useRef } from "react";
import "./UploadMedia.css";
import Axios from "axios";

/**
 * Lets Lance upload files
 * 
 * @returns {Node} UploadMedia
 */
const UploadMedia = () => {
    const mediaForm = useRef(null);

    const handleMediaUploadSubmit = (e) => {
        e.preventDefault();

        const formItems = e.target.elements;

        const description = formItems.description.value;
        const mediaFileToUpload = formItems.mediaFileToUpload.files[0];
        const mediaType = formItems.mediaType.value;
        const projectName = formItems.projectName.value;

        const data = {
            description: description,
            mediaFileToUpload: mediaFileToUpload,
            mediaType: mediaType,
            projectName: projectName
        };

        Axios.post("/media", data).then((initialInfo) => {
            console.log(initialInfo);
        }); 
    };

    return <form id="mediaForm" ref={mediaForm} onSubmit={handleMediaUploadSubmit} className="mediaContainer">
        <h1>Upload new media</h1>
        
        <p>Please fill in this form to upload new media and add details if you wish.</p>

        <label htmlFor="mediaFileToUpload"><strong>Upload your media file: </strong>
            <input type="file" placeholder="Location" name="mediaFileToUpload" id="mediaFileToUpload" required />
        </label>

        <label htmlFor="mediaType"><strong>What kind of media file is this? </strong>
            <select name="mediaType" id="mediaType">
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="document">Document</option>
                <option value="etc">Etc.</option>
            </select>
        </label>

        <label htmlFor="projectName"><strong>Project Name for media: </strong>
            <input type="text" placeholder="Project name" name="projectName" id="projectName"/>
        </label>

        <label htmlFor="description"><strong>Describe the project: </strong>
            <input type="text" placeholder="Description" name="description" id="description" />
        </label>

        <div>
            <button type="button" className="cancelbtn" onClick={()=>mediaForm.current.reset()}>Cancel</button>
            <button type="submit" className="signupbtn">Upload</button>
        </div>
    </form>;
};

export default UploadMedia;
