import { useRef, useState } from "react";
import "./AdminUploadMedia.css";
import axios from "axios";
import { validFileType, returnFileSize } from "../tools/vars";

/**
 * Let's Lance upload files
 * 
 * @returns {Node} AdminUploadMedia
 */
const AdminUploadMedia = () => {
    const [projectFiles, setProjectFiles] = useState({
        imageUpload: null,
        imageName: null,
        mediaFileToUpload: null,
        mediaFileName: null,
        projectName: null,
        description: null,
        mediaType: "audio"
    });
    const [uploadMsg, setUploadMsg] = useState("");
    const mediaForm = useRef(null);

    const saveAddlMediaInfo = (e) => {
        setProjectFiles(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            };
        });
    };

    const saveMediaFile = (e) => {
        // TODO: Have to check file size with returnFileSize(e.target.files[0].size) <- in bytes
        setProjectFiles(prev => {
            return {
                ...prev,
                mediaFileToUpload: e.target.files[0],
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

            setProjectFiles(prev => {
                return {
                    ...prev,
                    imageUpload: e.target.files[0],
                    imageName: e.target.files[0].name
                };
            });
        } else setUploadMsg("Sorry, your file is not a valid type. Please try again.");
    };

    const handleMediaUploadSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("description", projectFiles.description);
        formData.append("mediaFileToUpload", projectFiles.mediaFileToUpload);
        formData.append("mediaFileName", projectFiles.mediaFileName);
        formData.append("mediaType", projectFiles.mediaType);
        formData.append("projectName", projectFiles.projectName);
        formData.append("imageUpload", projectFiles.imageUpload);
        formData.append("imageName", projectFiles.imageName);

        try {
            await axios.post("/api/upload", formData)
                .then(() => setUploadMsg(`Media file ${projectFiles.mediaFileName} uploaded!`));
        } catch (err) { console.log(err); }
    };

    return (<>
        <section className="sect" aria-labelledby="media-upload-form">
            <form method="post" encType="multipart/form-data" id="media-upload-form" ref={mediaForm} onSubmit={handleMediaUploadSubmit} className="mediaContainer">
                {uploadMsg}

                {/* LOGO */}
                <label htmlFor="imageUpload" id="imageUploadBtn" className="preview">UPLOAD IMAGE
                    <input type="file" id="imageUpload" title="imageUpload" name="imageUpload" accept="image/*" onChange={saveImage} />
                </label>

                {/* PROJECT NAME */}
                <label htmlFor="projectName">Project Name
                    <input type="text" placeholder="Project Name" name="projectName" title="projectName" minLength="5" maxLength="50" onChange={saveAddlMediaInfo} />
                </label>

                {/* MEDIA TYPE */}
                <label htmlFor="mediaType">Type of Media
                    <select name="mediaType" title="mediaType" id="mediaType" onChange={saveAddlMediaInfo} >
                        <option value="">File type?</option>
                        <option value="audio">Audio</option>
                    </select>
                </label>

                {/* FILE UPLOAD */}
                <label htmlFor="mediaFileToUpload">Drag/drop or upload media
                    <input type="file" placeholder="investor-spotlight.wav" name="mediaFileToUpload" id="mediaFileToUpload" onChange={saveMediaFile} required accept="audio/*" />
                </label>

                {/* DESCRIPTION */}
                <label htmlFor="description">Description
                    <input type="text" placeholder="Description" name="description" id="description" required minLength="10" maxLength="500" onChange={saveAddlMediaInfo} />
                </label>

                {/* BUTTONS */}
                <button type="submit" className="public">Public</button> {' '} <button type="submit" className="private">Private</button>

                <button type="submit" className="signupbtn" disabled={!projectFiles.imageUpload && !projectFiles.imageName && !projectFiles.mediaFileToUpload && !projectFiles.mediaFileName && !projectFiles.projectName && !projectFiles.description && !projectFiles.mediaType}>UPLOAD</button>

                <button type="button" className="cancelbtn" onClick={() => mediaForm.current.reset()}>CANCEL</button>
            </form>
        </section>
    </>);
};

export default AdminUploadMedia;
