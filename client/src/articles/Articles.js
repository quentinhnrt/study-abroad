import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";
import { Link } from "react-router-dom";
import { Header } from "../header/Header";

export default function Articles() {
  const [data, setData] = useState([]);

  async function search(e) {
    let req = e.target.value;
    if (e.target.value != "") {
      const request = (await axios.get(`http://localhost:8000/search/${req}`))
        .data;
      setData(request);
    } else {
      getArticles();
    }
  }

  async function getArticles() {
    const data = (await axios.get("http://localhost:8000/articles")).data;
    setData(data);
  }

  useEffect(() => {
    getArticles();
  }, []);

  function displayThumbnail(url) {
    return <img src={"http://localhost:8000/thumbnail/" + url} />;
  }

  function displayMedia(type, url) {
    let fileType = type.split("/")[0];
    if (fileType === "image") {
      return <img src={"http://localhost:8000/media/" + url} />;
    } else if (fileType === "video") {
      return (
        <video controls>
          <source
            src={"http://localhost:8000/media/" + url}
            type={type}
          ></source>
        </video>
      );
    } else if (fileType === "audio") {
      <audio controls>
        <source src={"http://localhost:8000/media/" + url} type={type}></source>
      </audio>;
    }
  }

  return (
    <>
      <Header/>
      <h1>Articles !!</h1>
      <input type="search" onKeyUp={(e) => search(e)} />
      {data.length ? (
        data.map((x) => (
          <article key={x.id}>
            {displayThumbnail(x.thumbnailURL)}
            <h1 className="Article_title">{x.title}</h1>
            <section dangerouslySetInnerHTML={{ __html: x.content }}></section>
            {displayMedia(x.mediaType, x.mediaURL)}
            <Link to={`/articles/delete/${x.id}`}>
              <button>Delete</button>
            </Link>
          </article>
        ))
      ) : (
        <p>no articles</p>
      )}
    </>
  );
}
