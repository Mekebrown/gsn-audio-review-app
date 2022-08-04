import { useRef, useState } from "react";
import "./UploadMedia.css";
import Axios from "axios";

/**
 * Lets Lance upload files
 * 
 * @returns {Node} UploadMedia
 */
const UploadMedia = () => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [uploadMsg, setUploadMsg] = useState("Upload new media");
    const mediaForm = useRef(null);

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleMediaUploadSubmit = async (e) => {
        e.preventDefault();
        const formItems = e.target.elements;

        const formData = new FormData();

        formData.append("description", formItems.description.value);
        formData.append("mediaFileToUpload", file);
        formData.append("fileName", fileName);
        formData.append("mediaType", formItems.mediaType.value);
        formData.append("projectName", formItems.projectName.value);

        try {
            await Axios.post("/api/media", formData)
            .then((initialInfo) => {
                console.log(initialInfo);
                setUploadMsg(`Media file ${fileName} uploaded!`)
            });
        } catch (ex) {
          console.log(ex);
        }
    };

    return <form id="mediaForm" ref={mediaForm} onSubmit={handleMediaUploadSubmit} className="mediaContainer">
        <h1>{uploadMsg}</h1>
        
        <p>Please fill in this form to upload new media and add details if you wish.</p>

        <label htmlFor="mediaFileToUpload"><strong>Upload your media file: </strong>
            <input type="file" placeholder="Location" name="mediaFileToUpload" id="mediaFileToUpload" onChange={saveFile} required />
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
