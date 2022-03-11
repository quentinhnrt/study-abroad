import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header } from "../header/Header";

export default function EditArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [media, setMedia] = useState([]);
  const [mediaType, setMediaType] = useState([]);
  const [leadStory, setLeadStory] = useState(1);

  let { id } = useParams();

  async function fetchArticle() {
    const data = await (
      await axios.get(`http://localhost:8000/article/${id}`)
    ).data[0];
    setTitle(data.title);
    setContent(data.content);
    setThumbnail(data.thumbnailURL);
    setMedia(data.mediaURL);
    setLeadStory(data.leadStory);
    setMediaType(data.mediaType);
  }

  useEffect(() => {
    fetchArticle();
  }, []);

  let postArticle = (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    let formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", thumbnail);
    formData.append("media", media);
    formData.append("leadStory", leadStory);

    axios.put(`http://localhost:8000/editarticle/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  let handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  let handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  let handleContentChange = (e) => {
    setContent(e.target.value);
  };

  let handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  function validateTitle() {
    return title !== "";
  }

  function validateContent() {
    return content !== "";
  }

  function validateThumbnail() {
    return thumbnail.length !== 0;
  }

  function validate() {
    return {
      title: validateTitle(),
      content: validateContent(),
      thumbnail: validateThumbnail(),
    };
  }

  function displayThumbnail(url) {
    return (
      <img className="w-100" src={"http://localhost:8000/thumbnail/" + url} />
    );
  }

  function displayMedia(type, url) {
    let fileType = type.split("/")[0];
    if (fileType === "image") {
      return (
        <img
          className="w-100 rounded"
          src={"http://localhost:8000/media/" + url}
        />
      );
    } else if (fileType === "video") {
      return (
        <video className="w-100 rounded" controls>
          <source
            src={"http://localhost:8000/media/" + url}
            type={type}
          ></source>
        </video>
      );
    } else if (fileType === "audio") {
      <audio className="w-100 rounded" controls>
        <source src={"http://localhost:8000/media/" + url} type={type}></source>
      </audio>;
    }
  }

  const inputsAreAllValid = Object.keys(validate()).every(
    (index) => validate()[index]
  );

  let titleError = "";
  let contentError = "";
  let thumbnailError = "";

  if (!validateTitle()) {
    titleError = <p className="text-danger mt-2">Title is required.</p>;
  }

  if (!validateContent()) {
    contentError = <p className="text-danger mt-2">Content is required.</p>;
  }

  if (!validateThumbnail()) {
    thumbnailError = <p className="text-danger mt-2">Thumbnail is required.</p>;
  }

  return (
    <><Header /><div className="card m-3 shadow">
      <div className="card-header">
        <h1 className="text-center">Edit Article</h1>
      </div>
      <form className="p-3">
        <div className="form-group">
          <label>Title</label>
          <input
            onChange={handleTitleChange}
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={title} />
          {titleError}
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            className="form-control"
            cols="30"
            rows="10"
            id="content"
            onChange={handleContentChange}
            value={content}
          ></textarea>
          {contentError}
        </div>
        <div className="form-group">
          <label>Thumbnail</label>
          <div className="custom-file">
            <input
              onChange={handleThumbnailChange}
              type="file"
              className="custom-file-input" />
            <label className="custom-file-label">
              {thumbnail ? thumbnail.name : "Choose file"}
            </label>
            {thumbnailError}
          </div>
          {displayThumbnail(thumbnail)}
        </div>
        <div className="form-group">
          <label>Media</label>
          <div className="custom-file">
            <input
              onChange={handleMediaChange}
              type="file"
              name="media"
              className="form-control-file" />
            <label className="custom-file-label">
              {media ? media.name : "Choose file"}
            </label>
          </div>
          {mediaType.length ? displayMedia(mediaType, media) : null}
        </div>

        <label className="form-check-label mr-3">Lead story?</label>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="leadStory"
            checked={leadStory === 1}
            onClick={() => setLeadStory(1)} />
          <span className="form-check-label ml-1">Yes</span>
        </div>

        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="leadStory"
            checked={leadStory === 0}
            onClick={() => setLeadStory(0)} />
          <span className="form-check-label ml-1">No</span>
        </div>

        <button
          className="btn btn-block btn-outline-success mt-4"
          onClick={postArticle}
          disabled={!inputsAreAllValid}
        >
          Send
        </button>
      </form>
    </div></>
  );
}
