"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

import { isAudioFile } from "@/app/lib/media_placeholders";

/**
 * A Modal component showing a form to 
 * configure and upload
 * 
 * @param {function} onClose
 * 
 * @returns {React.ReactElement}
 */
export default function Page() {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(false);
    const [error, setError] = useState({ show: false, error: "" });

    const uploadTrackURL = process.env.NEXT_PUBLIC_BASE_URL + "/api/media";

    const resetFiles = () => {
        setFiles([]);
        setUploadStatus(false);
        setError({ show: false, error: "" });
    };

    const UploadTrack = async (e) => {
        e.preventDefault();

        const items = e.target;

        setFiles(items.file);

        try {
            if (!isAudioFile(e[0])) {
                setError({
                    show: true,
                    error: "Wrong type of file",
                });

                return;
            }

            const formAudio = new FormData();

            items.foreach(item => {
                formAudio.append(item, item);
            });

            const response = await axios.post(
                uploadTrackURL,
                formAudio,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            response.json()
                .then(() => {
                    setUploadStatus(true);

                    return response.data.data.fileName;
                });
        } catch (e) {
            setError({
                show: true,
                error: "Wrong type of file",
            });
        }
    };

    return <section>
        <p>Upload your audio</p>

        <form onSubmit={UploadTrack}>
            <label htmlFor="title">Project name or title</label>

            <input
                type="text"
                name="title"
                className="title"
                value={files?.title}
            />

            <label htmlFor="fileUpload">File upload</label>

            <input
                type="file"
                name="fileUpload"
                className="fileUpload"
                value={files?.fileUpload}
            />

            <label htmlFor="fileName">File info</label>

            <input
                type="text"
                name="fileName"
                className="fileName"
                value={files?.fileName}
            />

            <label htmlFor="mediaType">File type?</label>

            <input
                type="text"
                name="mediaType"
                className="mediaType"
                value={files?.mediaType}
            />

            <label htmlFor="mediaDesc">Description</label>

            <textarea
                name="mediaDesc"
                id="mediaDesc">
            </textarea>

            {files?.thumbURL ? <div>
                <Image
                    alt=""
                    src={files?.thumbURL}
                    width="200"
                    height="200"
                />
            </div> : <div>
                <label htmlFor="thumbUpload">Thumbnail</label>

                <input
                    type="file"
                    name="thumbUpload"
                    className="thumbUpload"
                />
            </div>}

            <label htmlFor="hasMediaMarkers">Has Media Markers?</label>
            <input
                type="radio"
                name="hasMediaMarkers"
                className="hasMediaMarkers"
                value={true}
            /> Yes

            <input
                type="radio"
                name="hasMediaMarkers"
                className="hasMediaMarkers"
                value={false}
            /> No

            <button
                type="submit"
            >
                Submit
            </button>
            <button type="reset">Clear All</button>
        </form>
    </section>
};
