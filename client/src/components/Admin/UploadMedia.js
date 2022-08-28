import { useRef, useState, useContext } from "react";
import "./UploadMedia.css";
import Axios from "axios";
import { UserContext } from "../tools/helper_functions";
import Home from "../Home";

/**
 * Lets Lance upload files
 * 
 * @returns {Node} UploadMedia
 */
const UploadMedia = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [uploadMsg, setUploadMsg] = useState("");
    const mediaForm = useRef(null);

    const {userId, setUserId} = useContext(UserContext);

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleMediaUploadSubmit = async (e) => {
        e.preventDefault();

        const projName = e.target.elements.projectName.value;

        if (projName
            && projName !== undefined && fileName !== undefined
            && projName !== 0 && fileName !== 0 
            && projName !== null && fileName !== null
            && projName !== "" && fileName !== "") {
            const formItems = e.target.elements;

            const formData = new FormData();

            formData.append("description", formItems.description.value);
            formData.append("mediaFileToUpload", file);
            formData.append("fileName", fileName);
            formData.append("mediaType", formItems.mediaType.value);
            formData.append("projectName", projName);

            try {
                await Axios.post("/api/media", formData)
                .then((initialInfo) => {
                    console.log(initialInfo);
                    setUploadMsg(`Media file ${fileName} uploaded!`);
                });
            } catch (ex) {
                console.log(ex);
            }
        } else setUploadMsg(`Media file not uploaded.`)
    };

    return (<>
        {userId ? 
            <form id="mediaForm" ref={mediaForm} onSubmit={handleMediaUploadSubmit} className="mediaContainer">
                {uploadMsg}

                <label htmlFor="imageUpload">UPLOAD IMAGE</label>
                <input type="file" id="imageUpload" title="imageUpload" name="imageUpload" accept="image/*" />

                <input type="text" placeholder="Project Name" />

                <select name="mediaType" id="mediaType">
                    <option value="">File type?</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="etc">Etc.</option>
                </select>

                <label htmlFor="mediaFileToUpload">
                    Drag/drop or upload media 
                </label>
                <input type="file" placeholder="investor-spotlight.wav" name="mediaFileToUpload" id="mediaFileToUpload" onChange={saveFile} required />

                <input type="text" placeholder="Description" name="description" id="description" required />

                <button type="submit" className="public">Public</button>

                <button type="submit" className="private">Private</button>

                <button type="submit" className="signupbtn">UPLOAD</button>

                <button type="button" className="cancelbtn" onClick={()=>mediaForm.current.reset()}>CANCEL</button>
            </form> : <Home />
        }
    </>);
};

export default UploadMedia;

