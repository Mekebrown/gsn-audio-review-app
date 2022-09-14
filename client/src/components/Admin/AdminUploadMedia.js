import { useRef, useState, useContext } from "react";
import "./AdminUploadMedia.css";
import axios from "axios";
import { UserContext } from "../../UserLogin";
import Home from "../Home";
import { validFileType, returnFileSize } from "../tools/vars";

/**
 * Lets Lance upload files
 * 
 * @returns {Node} AdminUploadMedia
 */
const AdminUploadMedia = () => {
    const [projectFiles, setProjectFiles] = useState({
        image: null,
        imageName: null,
        mediaFile: null,
        mediaFileName: null
    });
    const [uploadMsg, setUploadMsg] = useState("");
    const mediaForm = useRef(null);

    const { userId } = useContext(UserContext);

    const saveMediaFile = (e) => {
        // Have to check file size: e.target.files[0].size <- in bytes
        setProjectFiles(prev => {
            return {
                ...prev,
                mediaFile: e.target.files[0],
                mediaFileName: e.target.files[0].name
            };
        });
    };

    const saveImage = (e) => {
        setUploadMsg("");
        const preview = document.querySelector(".preview");

        while (preview.childNodes[0].nodeName === "IMG") { preview.removeChild(preview.firstChild); }

        if (e.target.files.length === 0) {
            setUploadMsg("No file is currently selected for upload.");
        } else if (validFileType(e.target.files[0])) {
            const img = document.createElement("img");
            img.setAttribute("alt", "img upload preview");
            img.style.width = "160px";
            img.style.height = "160px";

            img.src = URL.createObjectURL(e.target.files[0]);

            preview.prepend(img);

            console.log(returnFileSize(e.target.files[0].size));

            setProjectFiles(prev => {
                return {
                    ...prev,
                    image: e.target.files[0],
                    imageName: e.target.files[0].name
                };
            });
        } else setUploadMsg("Sorry, your file is not a valid type. Please try again.");
    };

    const handleMediaUploadSubmit = async (e) => {
        e.preventDefault();

        const file = projectFiles.mediaFile;
        const fileName = projectFiles.mediaFileName;
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
                await axios.post("/api/upload", formData)
                    .then((initialInfo) => {
                        console.log(initialInfo);
                        setUploadMsg(`Media file ${fileName} uploaded!`);
                    });
            } catch (ex) {
                console.log(ex);
            }
        } else setUploadMsg(`Media file not uploaded.`);
    };

    return (<>
        {userId ?
            <section className="sect" aria-labelledby="media-upload-form">
                <form method="post" encType="multipart/form-data" id="media-upload-form" ref={mediaForm} onSubmit={handleMediaUploadSubmit} className="mediaContainer">
                    {uploadMsg}

                    <label htmlFor="imageUpload" id="imageUploadBtn" className="preview">UPLOAD IMAGE</label>
                    <input type="file" id="imageUpload" title="imageUpload" name="imageUpload" accept="image/*" onChange={saveImage} />

                    <input type="text" placeholder="Project Name" minLength="5" maxLength="50" pattern="[\w\s\d?!.,!$#-_'\\/\\]" />

                    <select name="mediaType" title="mediaType" id="mediaType">
                        <option value="">File type?</option>
                        <option value="audio">Audio</option>
                    </select>

                    <label htmlFor="mediaFileToUpload">Drag/drop or upload media</label>
                    <input type="file" placeholder="investor-spotlight.wav" name="mediaFileToUpload" id="mediaFileToUpload" onChange={saveMediaFile} required accept="audio/*" />

                    <input type="text" placeholder="Description" name="description" id="description" required minLength="10" maxLength="500" pattern="[\w\s\d?!.,!$#-_'\\/\\]" />

                    <button type="submit" className="public">Public</button>

                    <button type="submit" className="private">Private</button>

                    <button type="submit" className="signupbtn">UPLOAD</button>

                    <button type="button" className="cancelbtn" onClick={() => mediaForm.current.reset()}>CANCEL</button>
                </form>
            </section> : <Home />
        }
    </>);
};

export default AdminUploadMedia;

