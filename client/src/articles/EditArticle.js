import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [media, setMedia] = useState([]);

  let { id } = useParams();

  async function fetchArticle() {
    const data = await (
      await axios.get(`http://localhost:8000/article/${id}`)
    ).data[0];
    setTitle(data.title);
    setContent(data.content);
    console.log(data);
    setThumbnail(data.thumbnailURL);
    setMedia(data.mediaURL);
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

  return (
    <div className="newArticle">
      <form>
        <input
          onChange={handleTitleChange}
          type="text"
          name="title"
          value={title}
          id="title"
        />
        <textarea
          onChange={handleContentChange}
          cols="30"
          rows="10"
          value={content}
          id="content"
        ></textarea>
        <label>Thumbnail</label>
        <input onChange={handleThumbnailChange} type="file" name="thumbnail" />
        <label>Media</label>
        <input onChange={handleMediaChange} type="file" name="media" />
        <button onClick={postArticle}>Send</button>
      </form>
    </div>
  );
}
