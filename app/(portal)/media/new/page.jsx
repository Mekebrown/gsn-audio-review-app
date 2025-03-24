"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

import { isAudioFile } from "@/app/lib/media_placeholders";
import { uploadAPIPath } from "@/app/lib/general_variables";

/**
 * A Modal component showing a form to configure and upload audio files.
 *
 * @returns {React.ReactElement}
 */
export default function Page() {
  const [files, setFiles] = useState({
    title: "",
    fileUpload: null,
    fileName: "",
    mediaType: "",
    mediaDesc: "",
    thumbURL: "",
    thumbUpload: null,
    hasMediaMarkers: null,
  });
  const [uploadStatus, setUploadStatus] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setFiles({
      title: "",
      fileUpload: null,
      fileName: "",
      mediaType: "",
      mediaDesc: "",
      thumbURL: "",
      thumbUpload: null,
      hasMediaMarkers: null,
    });
    setUploadStatus(false);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value, files: inputFiles } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: inputFiles ? inputFiles[0] : value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!files.fileUpload || !isAudioFile(files.fileUpload)) {
      setError("Please upload a valid audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("fileUpload", files.fileUpload);
    formData.append("title", files.title);
    formData.append("fileName", files.fileName);
    formData.append("mediaType", files.mediaType);
    formData.append("mediaDesc", files.mediaDesc);
    if (files.thumbUpload) {
      formData.append("thumbUpload", files.thumbUpload);
    }
    formData.append("hasMediaMarkers", files.hasMediaMarkers);

    try {
      const response = await axios.post(uploadAPIPath, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setUploadStatus(true);
        resetForm();
      } else {
        setError("Failed to upload the file. Please try again.");
      }
    } catch (err) {
      setError(`Error uploading file: ${err.message}`);
    }
  };

  if (uploadStatus) {
    return (
      <div>
        <p>Upload successful!</p>
      </div>
    );
  }

  return (
    <section>
      <h2>Upload Your Audio</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleUpload} onReset={resetForm}>
        <label htmlFor="title">Project Name or Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={files.title}
          onChange={handleInputChange}
        />

        <label htmlFor="fileUpload">File Upload</label>
        <input
          type="file"
          id="fileUpload"
          name="fileUpload"
          onChange={handleInputChange}
        />

        <label htmlFor="fileName">File Info</label>
        <input
          type="text"
          id="fileName"
          name="fileName"
          value={files.fileName}
          onChange={handleInputChange}
        />

        <label htmlFor="mediaType">File Type</label>
        <input
          type="text"
          id="mediaType"
          name="mediaType"
          value={files.mediaType}
          onChange={handleInputChange}
        />

        <label htmlFor="mediaDesc">Description</label>
        <textarea
          id="mediaDesc"
          name="mediaDesc"
          value={files.mediaDesc}
          onChange={handleInputChange}
        ></textarea>

        {files.thumbURL ? (
          <div>
            <Image
              alt="Thumbnail"
              src={files.thumbURL}
              width="200"
              height="200"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="thumbUpload">Thumbnail</label>
            <input
              type="file"
              id="thumbUpload"
              name="thumbUpload"
              onChange={handleInputChange}
            />
          </div>
        )}

        <fieldset>
          <legend>Has Media Markers?</legend>
          <label>
            <input
              type="radio"
              name="hasMediaMarkers"
              value="true"
              checked={files.hasMediaMarkers === "true"}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hasMediaMarkers"
              value="false"
              checked={files.hasMediaMarkers === "false"}
              onChange={handleInputChange}
            />
            No
          </label>
        </fieldset>

        <button type="submit">Submit</button>
        <button type="reset">Clear All</button>
      </form>
    </section>
  );
}
