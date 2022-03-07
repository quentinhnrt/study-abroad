import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NewArticle() {
  const [thumbnail, setThumbnail] = useState([]);

  let postArticle = (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let thumbnailPic = thumbnail;

    let formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", thumbnailPic);

    axios.post("http://localhost:8000/articles/new", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  let handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
    console.log(thumbnail);
  };

  return (
    <div className="newArticle">
      {console.log(thumbnail)}
      <form>
        <input type="text" name="title" id="title" />
        <textarea cols="30" rows="10" id="content"></textarea>
        <input onChange={handleFileChange} type="file" name="thumbnail" />
        <button onClick={postArticle}>Send</button>
      </form>
    </div>
  );
}
