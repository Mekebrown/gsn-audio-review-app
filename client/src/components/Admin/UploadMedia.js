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
    const [uploadMsg, setUploadMsg] = useState("Upload new media");
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

    // useEffect(() => {
    //     let collectedCookies = document.cookie.split(';');

    //     collectedCookies.forEach((item) => {
    //         let cookieInfo = item.split("=");

    //         if (cookieInfo[0] === "reviewPortal") setLoggedIn(true);
    //     });
    // }, []);

    return (<>
        {userId ? <form id="mediaForm" ref={mediaForm} onSubmit={handleMediaUploadSubmit} className="mediaContainer">
        {userId}
        <h1>{uploadMsg}</h1>
        {userId && <button onClick={() => setUserId(null)}>Log Out</button>}
        
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
            <input type="text" placeholder="Project name" name="projectName" id="projectName" required />
        </label>

        <label htmlFor="description"><strong>Describe the project: </strong>
            <input type="text" placeholder="Description" name="description" id="description" required />
        </label>

        <div>
            <button type="button" className="cancelbtn" onClick={()=>mediaForm.current.reset()}>Cancel</button>
            <button type="submit" className="signupbtn">Upload</button>
        </div>
    </form> : <Home />}
    </>);
};

export default UploadMedia;
