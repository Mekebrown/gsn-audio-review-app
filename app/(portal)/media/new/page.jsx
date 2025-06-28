"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getCookie } from 'cookies-next';

import StrapiHandler from "@/app/lib/strapiclient_handler";
import { isAudioFile } from "@/app/lib/media_placeholders";
import { signInUsernameCookie, getUserRoleCookie, userIdCookie } from "@/app/lib/general_variables";

/**
 * /upload* - close icon, msg, form (logo, title, desc, user, audio, datetimes), submit button, clear button, cancel link
 * 
 * A TODO: Modal component showing a form to configure and upload audio files.
 *
 * @returns {React.ReactElement}
 */
export default async function Page() {
  const [files, setFiles] = useState({
    title: "",
    description: "",
    media_file: null,
    media_url: "",
    thumbnail_file: null,
    thumbnail_url: "",
    category: "",
    markers: null,
  });
  const [uploadStatus, setUploadStatus] = useState(false);
  const [error, setError] = useState("");

  const currentUser = getCookie(signInUsernameCookie);
  
  if (!currentUser) {
    setError("You must be signed in to upload files.");
    
    return;
  }

  const resetForm = () => {
    setFiles({
      title: "",
      description: "",
      media_file: null,
      media_url: "",
      thumbnail_file: null,
      thumbnail_url: "",
      category: "",
      markers: null,
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

    if (!files.media_file || !isAudioFile(files.media_file)) {
      setError("Please upload a valid audio file.");
      return;
    }

    try {
      const currentUserRole = getCookie(getUserRoleCookie);
      const currentUserID = getCookie(userIdCookie);
      const awsS3BucketURL = "https://awss3bucketmedia.url/";
      const mediaFilenameFromUpload = files.media_file.name;
      const mediaTypeFromUpload = files.media_file.type;
      const tempCatArray = ["audio", "video", "image", "document"];
      const thumbnailFilenameFromUpload = files.thumbnail_file ? files.thumbnail_file.name : null;
      const isMediaTypeInCategoryArray = tempCatArray.split(",").map((cat) => cat.trim()).includes(mediaTypeFromUpload);

      if (!currentUserRole || currentUserRole !== "admin") {
        setError("You must be an admin to upload files.");

        return;
      }

      const formData = new FormData();
      formData.append("title", files.title);
      formData.append("description", files.description);
      formData.append("media_file", files.media_file);
      formData.append("media_url", awsS3BucketURL + mediaFilenameFromUpload);
      formData.append("admin_user", currentUserID || 1);
      formData.append("assigned_users", [1, 2, 3]);

      if (isMediaTypeInCategoryArray) {
        formData.append("category", files.category);
      }

      if (files.markers) {
        formData.append("markers", files.markers);
      }

      if (files.thumbnail_file) {
        formData.append("thumbnail_file", files.thumbnail_file);
        formData.append("thumbnail_url", awsS3BucketURL + thumbnailFilenameFromUpload);
      }
      
      const mediaHandler = StrapiHandler.collection("media");
      const response = mediaHandler.create(formData);

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

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={files.description}
          onChange={handleInputChange}
        ></textarea>

        <label htmlFor="media_file">File Upload</label>
        <input
          type="file"
          id="media_file"
          name="media_file"
          onChange={handleInputChange}
        />

        <label htmlFor="category">Category/File Type</label>
        <input
          type="text"
          id="category"
          name="category"
          value={files.category}
          onChange={handleInputChange}
        />

        {files.thumbnail ? (
          <div>
            <Image
              alt="Thumbnail"
              src={files.thumbnail}
              width="200"
              height="200"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="thumbnail_file">Thumbnail Upload</label>
            <input
              type="file"
              id="thumbnail_file"
              name="thumbnail_file"
              onChange={handleInputChange}
            />
          </div>
        )}

        <fieldset>
          <legend>Has Media Markers?</legend>
          <label>
            <input
              type="radio"
              name="markers"
              value="true"
              checked={files.markers === "true"}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="markers"
              value="false"
              checked={files.markers === "false"}
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
