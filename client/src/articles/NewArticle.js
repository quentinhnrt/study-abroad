import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NewArticle() {
  const [thumbnail, setThumbnail] = useState([]);
  const [media, setMedia] = useState([]);


  let postArticle = (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let thumbnailPic = thumbnail;


    let formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", thumbnail);
    formData.append("media", media);


    axios.post("http://localhost:8000/articles/new", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };


  let handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  let handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  return (
    <div className="newArticle">
      <form>
        <input type="text" name="title" id="title" />
        <textarea cols="30" rows="10" id="content"></textarea>
        <label>Thumbnail</label>
        <input onChange={handleThumbnailChange} type="file" name="thumbnail" />
        <label>Media</label>
        <input onChange={handleMediaChange} type="file" name="media" />
        <button onClick={postArticle}>Send</button>
      </form>
    </div>
  );
}
