import React, { useState } from "react";
import axios from "axios";
import { Header } from "../header/Header";
import { Navigate, useParams, Link } from "react-router-dom";

export default function NewArticle(props) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;

  const [thumbnail, setThumbnail] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [leadStory, setLeadStory] = useState(1);
  const [navigate, setNavigate] = useState(false);

  let postArticle = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", thumbnail);
    formData.append("media", media);
    formData.append("leadStory", leadStory);

    axios.post("http://localhost:8000/articles/new", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setNavigate(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleMediaChange = (e) => {
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

    <>
    <Header />
    {navigate ? <Navigate to="/articles" /> : null}
    <div className="card m-3 shadow">
      <div className="card-header">
        <h1 className="text-center">New Article</h1>
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
          />
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
          ></textarea>
          {contentError}
        </div>
        <div className="form-group">
          <label>Thumbnail</label>
          <div className="custom-file">
            <input
              onChange={handleThumbnailChange}
              type="file"
              className="custom-file-input"
            />
            <label className="custom-file-label">
              {thumbnail ? thumbnail.name : "Choose file"}
            </label>
            {thumbnailError}
          </div>
        </div>
        <div className="form-group">
          <label>Media</label>
          <div className="custom-file">
            <input
              onChange={handleMediaChange}
              type="file"
              name="media"
              className="custom-file-input"
            />
            <label className="custom-file-label">
              {media ? media.name : "Choose file"}
            </label>
          </div>
        </div>

        <label className="form-check-label mr-3">Lead story?</label>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="leadStory"
            checked={leadStory === 1}
            onClick={() => setLeadStory(1)}
          />
          <span className="form-check-label ml-1">Yes</span>
        </div>

        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="leadStory"
            checked={leadStory === 0}
            onClick={() => setLeadStory(0)}
          />
          <span className="form-check-label ml-1">No</span>
        </div>

        <button
          className="btn btn-block btn-outline-primary mt-4"
          onClick={postArticle}
          disabled={!inputsAreAllValid}
        >
          Send
        </button>

      </form>
    </div></>
  );
}
